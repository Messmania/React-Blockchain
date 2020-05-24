import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import axios from "axios";
import { add, remove, show, sortByRank, sortByPrice } from "../store/actions/actions";
import { sanitizeData } from "../utils/general";

import AddCurrency from "../components/AddCurrency/addCurrency";
import Currencies from "../components/Currencies/currencies";

class App extends Component {

  componentDidMount() {
    axios.get('/coinmarketcap/map?limit=10')
      .then(response => {
        const firstFive = response.data.data.slice(0, 5).map(e => e.id);
        const showInDropdown = sanitizeData(response.data.data.slice(5));
        axios.get(`/coinmarketcap/quotes?id=${firstFive.join()}`)
          .then(response => {
            let total = sanitizeData(response.data.data);
            let showInTable = total.slice(0, 5);
            this.props.showAll(showInTable, showInDropdown);
          });
      });
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
