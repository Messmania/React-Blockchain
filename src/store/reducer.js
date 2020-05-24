import * as actionTypes from "./actions/actions";
import { updatedObj } from "./utility"

const initialState = {
    selected: [],
    unSelected: [],
    ascSortByRank: false,
    ascSortByPrice: false
}

const addCurrency = (state, action) => {
    let id = parseInt(action.id);
    //--fetch this id from server!
    let match = state.unSelected.filter(e => e.id === id)[0]; //--find item from dropdown
    let noMatch = state.unSelected.filter(e => e.id !== id); //-- other items from dropdown
    return updatedObj(state, { selected: state.selected.concat(match), unSelected: noMatch })
}

const removeCurrency = (state, action) => {
    let id = parseInt(action.id);
    let match = state.selected.filter(e => e.id === id)[0]; //--find item from table
    let noMatch = state.selected.filter(e => e.id !== id); //--other items in table
    return updatedObj(state, { selected: noMatch, unSelected: state.unSelected.concat(match) })
}

const sortByRank = (state) => {
    //--JSON parse method creates deep copy i.e. all references are new, so react will re-render everything!
    let selected = JSON.parse(JSON.stringify(state)).selected; //--bad for performance, change this
    // console.log("Sort!:", selected)
    selected.sort((a, b) => state.ascSortByRank ? a.rank - b.rank : b.rank - a.rank);
    return updatedObj(state, { selected: selected, ascSortByRank: !state.ascSortByRank })
}

const sortByPrice = (state) => {
    let selected = JSON.parse(JSON.stringify(state)).selected;//--bad for performance, change this
    selected.sort((a, b) => state.ascSortByPrice ? a.price - b.price : b.price - a.price);
    return updatedObj(state, { selected: selected, ascSortByPrice: !state.ascSortByPrice });
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_CURRENCY: return addCurrency(state, action)
        case actionTypes.SHOW_ALL: return updatedObj(state, { selected: action.sel, unSelected: action.unsel })
        case actionTypes.REMOVE_CURRENCY: return removeCurrency(state, action)
        case actionTypes.SORT_BY_RANK: return sortByRank(state)
        case actionTypes.SORT_BY_PRICE: return sortByPrice(state)
        default: return state;
    }
}

export default reducer;