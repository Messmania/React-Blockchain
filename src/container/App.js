import React, { Component } from 'react';
import logo from '../logo.svg';
import './App.css';
import { connect } from "react-redux";
import axios from "axios";
import { add, remove, show, sortByRank, sortByPrice } from "../store/actions/actions";
import { sanitizeData, MAX_SIZE } from "../utils/general";

import AddCurrency from "../components/AddCurrency/addCurrency";
import Currencies from "../components/Currencies/currencies";

// const response = {
//   "data": {
//     "data": [
//       {
//         "id": 1,
//         "cmc_rank": 1,
//         "symbol": "BTC0",
//         "quote": {
//           "USD": {
//             "price": 250
//           }
//         },
//         "name": "Bitcoin0"
//       },
//       {
//         "id": 2,
//         "cmc_rank": 2,
//         "symbol": "BTC1",
//         "quote": {
//           "USD": {
//             "price": 251
//           }
//         },
//         "name": "Bitcoin1"
//       },
//       {
//         "id": 3,
//         "cmc_rank": 3,
//         "symbol": "BTC2",
//         "quote": {
//           "USD": {
//             "price": 252
//           }
//         },
//         "name": "Bitcoin2"
//       },
//       {
//         "id": 4,
//         "cmc_rank": 4,
//         "symbol": "BTC3",
//         "quote": {
//           "USD": {
//             "price": 253
//           }
//         },
//         "name": "Bitcoin3"
//       },
//       {
//         "id": 5,
//         "cmc_rank": 5,
//         "symbol": "BTC4",
//         "quote": {
//           "USD": {
//             "price": 254
//           }
//         },
//         "name": "Bitcoin4"
//       },
//       {
//         "id": 6,
//         "cmc_rank": 6,
//         "symbol": "BTC5",
//         "quote": {
//           "USD": {
//             "price": 255
//           }
//         },
//         "name": "Bitcoin5"
//       },
//       {
//         "id": 7,
//         "cmc_rank": 7,
//         "symbol": "BTC6",
//         "quote": {
//           "USD": {
//             "price": 256
//           }
//         },
//         "name": "Bitcoin6"
//       },
//       {
//         "id": 8,
//         "cmc_rank": 8,
//         "symbol": "BTC7",
//         "quote": {
//           "USD": {
//             "price": 257
//           }
//         },
//         "name": "Bitcoin7"
//       },
//       {
//         "id": 9,
//         "cmc_rank": 9,
//         "symbol": "BTC8",
//         "quote": {
//           "USD": {
//             "price": 258
//           }
//         },
//         "name": "Bitcoin8"
//       },
//       {
//         "id": 10,
//         "cmc_rank": 10,
//         "symbol": "BTC9",
//         "quote": {
//           "USD": {
//             "price": 259
//           }
//         },
//         "name": "Bitcoin9"
//       }
//     ]
//   }
// }
class App extends Component {

  state = {
    error: false,
    details: ''
  }

  updateError(error){
    this.setState({
      error: true,
      details: error
    });

  }
  /**
   * Loads all the currencies and fetches details of first 5 to show in table
   */
  componentDidMount() {
    axios.get('/coinmarketcap/map')
      .then(response => {
        const firstFive = response.data.data.slice(0, 5).map(e => e.id);
        const showInDropdown = sanitizeData(response.data.data.slice(5));
        axios.get(`/coinmarketcap/quotes?id=${firstFive.join()}`)
          .then(response => {
            let total = sanitizeData(response.data.data);
            let showInTable = total.slice(0, 5);
            this.props.showAll(showInTable, showInDropdown);
          })
          .catch(error => this.updateError(error));
      })
      .catch(error => this.updateError(error));
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div>StackAdapt</div>
          <div>
            <img src={logo} className="App-logo" alt="logo" />
            <span>Blockchain Tracker</span>
          </div>
        </header>
        {this.state.error ? <div className="errorMessage"> Oops! Something went wrong: {this.state.details.message} </div> :
          <div className="main">
            <AddCurrency
              unsel={this.props.unsel}
              selectHandler={(event) => this.props.onAddCurrency(event.target.value)} />
            <Currencies
              sel={this.props.sel}
              delete={this.props.onRemoveCurrency}
              sortByRank={this.props.onSortByRank}
              sortByPrice={this.props.onSortByPrice}
              ascRank={this.props.ascRank}
              ascPrice={this.props.ascPrice}
            />
            {this.props.error ?
              <div className="errorMessage">
                Cannot track more than {MAX_SIZE} currencies, please remove old entries to add more.</div>
              : null
            }
          </div>
        }
      </div >
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sel: state.selected,
    unsel: state.unSelected,
    ascRank: state.ascSortByRank,
    ascPrice: state.ascSortByPrice,
    error: state.error
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
