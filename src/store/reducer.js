import * as actionTypes from "./actions/actions";
import { updatedObj } from "../utils/storeUtil";
import { MAX_SIZE } from "../utils/general";

const initialState = {
    selected: [],
    unSelected: [],
    ascSortByRank: false, //-- to keep a track of current sort order for Rank column
    ascSortByPrice: false,//-- to keep a track of current sort order for Price column
    error: false
}

/**
 * Moves selected currency from dropdown to table
 */
const addCurrency = (state, action) => {
    if (state.selected.length === MAX_SIZE) {
        return updatedObj(state, { error: true });
    }
    let id = parseInt(action.id);
    let newSelected = action.newEntry;
    let noMatch = state.unSelected.filter(e => e.id !== id); //-- other items from dropdown
    return updatedObj(state, { selected: state.selected.concat(newSelected), unSelected: noMatch })
}

/**
 * Removes selected currency from table
 */
const removeCurrency = (state, action) => {
    let id = parseInt(action.id);
    let match = state.selected.filter(e => e.id === id)[0]; //--find item from table
    let noMatch = state.selected.filter(e => e.id !== id); //--other items in table
    let updatedUnSel = state.unSelected.concat(match);
    if (state.error) {
        return updatedObj(state, { selected: noMatch, unSelected: updatedUnSel, error: false })
    }
    return updatedObj(state, { selected: noMatch, unSelected: updatedUnSel })
}

/**
 * Sorts the table by CMC_Rank
 */
const sortByRank = (state) => {
    let selected = JSON.parse(JSON.stringify(state)).selected;
    selected.sort((a, b) => state.ascSortByRank ? a.rank - b.rank : b.rank - a.rank);
    return updatedObj(state, { selected: selected, ascSortByRank: !state.ascSortByRank })
}
/**
 * Sorts the table by Price
 */
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