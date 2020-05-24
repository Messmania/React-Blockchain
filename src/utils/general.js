export const sanitizeData = (data) => {
    const arr = [];
    for (let key in data) {
      let val = data[key];
      arr.push({
        id: val.id,
        rank: val.cmc_rank,
        price: val.quote ? val.quote.USD.price.toFixed(3): undefined,
        symbol: val.symbol,
        name: val.name
      });
    }
    console.log("Sanitized!", arr);
    return arr;
  }