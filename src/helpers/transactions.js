export async function commitWithRetry(session) {
  try {
    await session.commitTransaction();
    console.log('Transaction committed.');
  } catch (error) {
    if (
      error.errorLabels &&
      error.errorLabels.indexOf('UnknownTransactionCommitResult') < 0
    ) {
      console.log('UnknownTransactionCommitResult, retrying commit operation ...');
      await commitWithRetry(session);
    } else {
      console.log('Error during commit ...');
      throw error;
    }
  }
}

export async function runTransactionWithRetry(txnFunc, client, session, ...args) {
  try {
    const result = await txnFunc(client, session, ...args);
    return result;
  } catch (error) {
    console.log('Transaction aborted. Caught exception during transaction.');

    // If transient error, retry the whole transaction
    console.log(error.errorLabels && error.errorLabels.indexOf('TransientTransactionError'));
    if (error.errorLabels && error.errorLabels.indexOf('TransientTransactionError') < 0) {
      console.log('TransientTransactionError, retrying transaction ...');
      return await runTransactionWithRetry(txnFunc, client, session, ...args);
    } else {
      throw error;
    }
  }
}
