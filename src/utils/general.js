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
    return arr;
  }

  export const MAX_SIZE=10;