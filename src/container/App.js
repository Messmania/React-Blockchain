import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import axios from "axios";
import {add, remove, show, sortByRank, sortByPrice} from "../store/actions/actions";

import AddCurrency from "../components/AddCurrency/addCurrency";
import Currencies from "../components/Currencies/currencies";

// let newSel = [{
//   id: 1,
//   name: "Bitcoin",
//   symbol: "BTC",
//   rank: 1,
//   "price": 20
// }];

// let newUnsel = [
//   {
//     "id": 2,
//     "name": "Litecoin",
//     "symbol": "LTC",
//     "rank": 5,
//     "price": 10
//   },
//   {
//     "id": 3,
//     "name": "Namecoin",
//     "symbol": "NMC",
//     "rank": 310,
//     "price": 30
//   }
// ]

let data = {
  "1": {
    "id": 1,
    "name": "Bitcoin",
    "symbol": "BTC",
    "slug": "bitcoin",
    "num_market_pairs": 7919,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": 21000000,
    "circulating_supply": 17906012,
    "total_supply": 17906012,
    "platform": null,
    "cmc_rank": 1,
    "last_updated": "2019-08-30T18:51:28.000Z",
    "quote": {
      "USD": {
        "price": 9558.55163723,
        "volume_24h": 13728947008.2722,
        "percent_change_1h": -0.127291,
        "percent_change_24h": 0.328918,
        "percent_change_7d": -8.00576,
        "market_cap": 171155540318.86005,
        "last_updated": "2019-08-30T18:51:28.000Z"
      }
    }
  },
  "2": {
    "id": 2,
    "name": "Litecoin",
    "symbol": "LTC",
    "slug": "litecoin",
    "num_market_pairs": 538,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": 84000000,
    "circulating_supply": 63147124.0076922,
    "total_supply": 63147124.0076922,
    "platform": null,
    "cmc_rank": 5,
    "last_updated": "2019-08-30T18:51:04.000Z",
    "quote": {
      "USD": {
        "price": 64.3490898062,
        "volume_24h": 2422872311.59193,
        "percent_change_1h": -0.147577,
        "percent_change_24h": -0.605248,
        "percent_change_7d": -14.3377,
        "market_cap": 4063459953.7742333,
        "last_updated": "2019-08-30T18:51:04.000Z"
      }
    }
  },
  "3": {
    "id": 3,
    "name": "Namecoin",
    "symbol": "NMC",
    "slug": "namecoin",
    "num_market_pairs": 7,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": null,
    "circulating_supply": 14736400,
    "total_supply": 14736400,
    "platform": null,
    "cmc_rank": 310,
    "last_updated": "2019-08-30T18:51:02.000Z",
    "quote": {
      "USD": {
        "price": 0.659511256875,
        "volume_24h": 1358.6474332893,
        "percent_change_1h": -0.10402,
        "percent_change_24h": -4.96048,
        "percent_change_7d": -11.5193,
        "market_cap": 9718821.68581275,
        "last_updated": "2019-08-30T18:51:02.000Z"
      }
    }
  },
  "4": {
    "id": 4,
    "name": "Terracoin",
    "symbol": "TRC",
    "slug": "terracoin",
    "num_market_pairs": 5,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": 42000000,
    "circulating_supply": 22935396.4303612,
    "total_supply": 22935396.4303612,
    "platform": null,
    "cmc_rank": 926,
    "last_updated": "2019-08-30T18:51:02.000Z",
    "quote": {
      "USD": {
        "price": 0.0354833951885,
        "volume_24h": 12.2529187829195,
        "percent_change_1h": -0.203895,
        "percent_change_24h": 23.1498,
        "percent_change_7d": -6.87748,
        "market_cap": 813825.7353434187,
        "last_updated": "2019-08-30T18:51:02.000Z"
      }
    }
  },
  "5": {
    "id": 5,
    "name": "Peercoin",
    "symbol": "PPC",
    "slug": "peercoin",
    "num_market_pairs": 17,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": null,
    "circulating_supply": 25598044.6796423,
    "total_supply": 25598044.6796423,
    "platform": null,
    "cmc_rank": 346,
    "last_updated": "2019-08-30T18:51:03.000Z",
    "quote": {
      "USD": {
        "price": 0.311765635492,
        "volume_24h": 86498.6614679456,
        "percent_change_1h": 0.187303,
        "percent_change_24h": -2.87583,
        "percent_change_7d": -20.0819,
        "market_cap": 7980590.666901291,
        "last_updated": "2019-08-30T18:51:03.000Z"
      }
    }
  },
  "6": {
    "id": 6,
    "name": "Novacoin",
    "symbol": "NVC",
    "slug": "novacoin",
    "num_market_pairs": 2,
    "date_added": "2013-04-28T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": null,
    "circulating_supply": 2335128.365177,
    "total_supply": 2335128.365177,
    "platform": null,
    "cmc_rank": 842,
    "last_updated": "2019-08-30T18:51:02.000Z",
    "quote": {
      "USD": {
        "price": 0.483513648538,
        "volume_24h": 939.079308817378,
        "percent_change_1h": 0.315204,
        "percent_change_24h": -0.121706,
        "percent_change_7d": -12.024,
        "market_cap": 1129066.4356513065,
        "last_updated": "2019-08-30T18:51:02.000Z"
      }
    }
  },
  "9": {
    "id": 9,
    "name": "Mincoin",
    "symbol": "MNC",
    "slug": "mincoin",
    "num_market_pairs": 1,
    "date_added": "2013-05-03T00:00:00.000Z",
    "tags": [
      "mineable"
    ],
    "max_supply": null,
    "circulating_supply": 5773780.88794916,
    "total_supply": 5773780.88794916,
    "platform": null,
    "cmc_rank": 1603,
    "last_updated": "2019-08-30T18:51:03.000Z",
    "quote": {
      "USD": {
        "price": 0.00754594591753,
        "volume_24h": 3.9439507206942,
        "percent_change_1h": -0.123411,
        "percent_change_24h": -2.14569,
        "percent_change_7d": -13.4085,
        "market_cap": 43568.638320132704,
        "last_updated": "2019-08-30T18:51:03.000Z"
      }
    }
  },
  "13": {
    "id": 13,
    "name": "Ixcoin",
    "symbol": "IXC",
    "slug": "ixcoin",
    "num_market_pairs": 2,
    "date_added": "2013-05-08T00:00:00.000Z",
    "tags": [],
    "max_supply": null,
    "circulating_supply": 21088530.999,
    "total_supply": 21088530.999,
    "platform": null,
    "cmc_rank": 1277,
    "last_updated": "2019-08-30T18:51:02.000Z",
    "quote": {
      "USD": {
        "price": 0.00910236135741,
        "volume_24h": 0,
        "percent_change_1h": 0,
        "percent_change_24h": 0.640669,
        "percent_change_7d": -46.4229,
        "market_cap": 191955.42964984055,
        "last_updated": "2019-08-30T18:51:02.000Z"
      }
    }
  }
}

class App extends Component {

  sanitizeData = (data) => {
    const arr = [];
    for (let key in data) {
      let val = data[key];
      arr.push({
        id: val.id,
        rank: val.cmc_rank,
        price: val.quote.USD.price.toFixed(3),
        symbol: val.symbol,
        name: val.name
      });
    }
    console.log("Sanitized!", arr);
    return arr;
  }

  componentDidMount() {
    axios.get('/coinmarketcap/map?limit=10', { withCredentials: true })
      .then(response => {
        console.log("Success!", response);
        const firstFive = response.data.data.slice(0, 5).map(e => e.id);
        const showInDropdown = response.data.data.slice(5);
        console.log("First five:", firstFive);
        // let firstFive =[1,2,3,4,5];
        axios.get(`/coinmarketcap/quotes?id=${firstFive.join()}`)
          .then(response => {
            console.log("Success 2nd:", response);
            let total = this.sanitizeData(response.data.data);
            // let total = this.sanitizeData(data);
            let showInTable = total.slice(0, 5);
            console.log("Show:", showInDropdown, showInTable);
            this.props.showAll(showInTable, showInDropdown);
          });
      });
    // this.props.showAll(newSel, newUnsel);
    console.log("Mount:", this.props.unsel);
  }


  render() {
    console.log("Render called")
    return (
      // <div className="App">
      //   <header className="App-header">
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>

      <div>
        <AddCurrency unsel={this.props.unsel} selectHandler={(event) => this.props.onAddCurrency(event.target.value)} />
        <Currencies sel={this.props.sel} delete={this.props.onRemoveCurrency} sortByRank={this.props.onSortByRank} sortByPrice={this.props.onSortByPrice} />
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sel: state.selected,
    unsel: state.unSelected
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCurrency: (id) => dispatch(add(id)),
    onRemoveCurrency: (id) => dispatch(remove(id)),
    showAll: (sel, unsel) => dispatch(show(sel, unsel)),
    onSortByRank: () => dispatch(sortByRank()),
    onSortByPrice: () => dispatch(sortByPrice())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
