/**
 * [formatNumber description]
 *
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
const formatNumber = (number) => (
  number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
);

/**
 * [randomInteger description]
 *
 * @param  {Number} [max=100] [description]
 * @param  {Number} [min=0]   [description]
 * @return {[type]}           [description]
 */
const randomInteger = (max = 100, min = 0) => (
  Math.floor(Math.random() * (max - min)) + min
);

/**
 * [randomNumber description]
 *
 * @param  {Number} [max=100] [description]
 * @param  {Number} [min=0]   [description]
 * @return {[type]}           [description]
 */
const randomNumber = (max = 100, min = 0) => (
  Math.random() * (max - min) + min
);

export {
  formatNumber,
  randomInteger,
  randomNumber,
};