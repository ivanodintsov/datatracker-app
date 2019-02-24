import numeral from 'numeral';

const reduceNumber = x => numeral(x).format('0.[0]a');

export default reduceNumber;
