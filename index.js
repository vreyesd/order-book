const PRICE = 0;
const AMOUNT = 1;

class OrderBook {
  constructor() {
    this.bids = [];
    this.asks = [];
  }

  insertOrder(price, count, amount) {
    const book = amount > 0 ? "bids" : "asks";

    if (count) {
      this.#addOrder(book, price, amount);
    } else {
      this.#removeOrder(book, price);
    }
  }

  #addOrder(book, price, amount) {
    const newOrder = [price, Math.abs(amount)];
    for (let i = 0, l = this[book].length; i < l; i++) {
      const [priceBook] = this[book][i];

      if (amount > 0) {
        if (priceBook < price) {
          this[book].splice(i, 0, newOrder);
          return;
        } else if (priceBook === price) {
          this[book][i][1] = newOrder[1];
          return;
        }
      } else if (amount < 0) {
        if (priceBook > price) {
          this[book].splice(i, 0, newOrder);
          return;
        } else if (priceBook === price) {
          this[book][i][1] = newOrder[1];
          return;
        }
      }
    }
    this[book].push(newOrder);
  }

  #removeOrder(book, price) {
    const orderIndex = this[book].findIndex((o) => o[PRICE] === price);
    this[book].splice(orderIndex, 1);
  }
}

module.exports = {
  OrderBook,
  PRICE,
  AMOUNT,
};
