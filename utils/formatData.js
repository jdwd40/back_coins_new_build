exports.formatUserData = (userData) => {
    if (userData === undefined) return [];
    return userData.map((u) => {
      return [u.username, u.email, u.password, u.funds];
    });
  };
  
  exports.formatCoinsData = (coinsData) => {
    if (coinsData === undefined) return [];
    return coinsData.map((c) => {
      return [c.name, c.symbol, c.current_price];
    });
  };
  
  exports.formatTransactionsData = (transactionsData) => {
    if (transactionsData === undefined) return [];
    return transactionsData.map((t) => {
      return [t.user_id, t.coin_id, t.type, t.amount, t.price, t.timestamp];
    });
  };
  
  exports.formatCoinPriceHistoryData = (coinPriceHistoryData) => {
    if (coinPriceHistoryData === undefined) return [];
    return coinPriceHistoryData.map((h) => {
      return [h.coin_id, h.price, h.timestamp];
    });
  };
  
  exports.formatEventsData = (eventsData) => {
    if (eventsData === undefined) return [];
    return eventsData.map((e) => {
      return [e.type, e.start_time, e.end_time];
    });
  };
  
  exports.formatCoinEventsData = (coinEventsData) => {
    if (coinEventsData === undefined) return [];
    return coinEventsData.map((ce) => {
      return [ce.coin_id, ce.type, ce.start_time, ce.end_time];
    });
  };
  