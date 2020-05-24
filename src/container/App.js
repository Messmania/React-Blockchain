import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import * as actions from "../store/actions";

import AddCurrency from "../components/AddCurrency/addCurrency";
import Currencies from "../components/Currencies/currencies";

const newSel = [{
  id: 1,
  name: "Bitcoin",
  symbol: "BTC",
  rank: 1,
  "price": 20
}];

const newUnsel = [
  {
      "id": 2,
      "name": "Litecoin",
      "symbol": "LTC",
      "rank": 5,
      "price": 10
  },
  {
      "id": 3,
      "name": "Namecoin",
      "symbol": "NMC",
      "rank": 310,
      "price": 30
  }
]

class App extends Component {

  componentDidMount() {
    this.props.showAll(newSel, newUnsel);
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    sel: state.selected,
    unsel: state.unSelected,
    ascRank: state.ascSortByRank,
    ascPrice: state.ascSortByPrice
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddCurrency: (id) => dispatch({ type: actions.ADD_CURRENCY, id }),
    onRemoveCurrency: (id) => dispatch({ type: actions.REMOVE_CURRENCY, id }),
    showAll: (sel, unsel) => dispatch({ type: actions.SHOW_ALL, sel, unsel }),
    onSortByRank: () => dispatch({type: actions.SORT_BY_RANK}),
    onSortByPrice: () => dispatch({type: actions.SORT_BY_PRICE})
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
