const { adjustCoinPrices } = require('../simPrices');

// call the function
adjustCoinPrices().then(() => {
  console.log('Price adjustment complete');
}).catch(err => {
  console.error('Price adjustment failed: ', err);
});

