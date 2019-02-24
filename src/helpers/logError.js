import { inspect } from 'util';

const logError = (name, data) => {
  const logData = {
    type: 'Error',
    name,
    data
  };
  const inspected = inspect(logData, false, null);

  console.log(inspected);

  return inspected;
};

export default logError;
