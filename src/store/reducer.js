import * as actionTypes from "./actions/actions";
import { updatedObj } from "./utility"

const initialState = {
    selected: [],
    unSelected: [],
    ascSortByRank: false,
    ascSortByPrice: false
}

const reducer = (state = initialState, action) => {
    let id = parseInt(action.id);
    let match, notMatch, selected;
    switch (action.type) {
        case actionTypes.SHOW_ALL: return updatedObj(state, { selected: action.sel, unSelected: action.unsel })
        // return {
        //     ...state,
        //     selected: action.sel,
        //     unSelected: action.unsel
        // }
        case actionTypes.ADD_CURRENCY:
            //--fetch this id from server!
            match = state.unSelected.filter(e => e.id === id)[0]; //--find item from dropdown
            notMatch = state.unSelected.filter(e => e.id !== id); //-- other items from dropdown
            return updatedObj(state, { selected: state.selected.concat(match), unSelected: notMatch })
        // return {
        //     ...state,
        //     selected: state.selected.concat(match),
        //     unSelected: notMatch
        // }
        case actionTypes.REMOVE_CURRENCY:
            match = state.selected.filter(e => e.id === id)[0]; //--find item from table
            notMatch = state.selected.filter(e => e.id !== id); //--other items in table
            return updatedObj(state, { selected: notMatch, unSelected: state.unSelected.concat(match) })
        // return {
        //     ...state,
        //     selected: notMatch,
        //     unSelected: state.unSelected.concat(match)
        // }
        case actionTypes.SORT_BY_RANK:
            //--JSON parse method creates deep copy i.e. all references are new, so react will re-render everything!
            selected = JSON.parse(JSON.stringify(state)).selected; //--bad for performance, change this
            console.log("Sort!:", selected)
            selected.sort((a, b) => state.ascSortByRank ? a.rank - b.rank : b.rank - a.rank);
            return updatedObj(state, { selected: selected, ascSortByRank: !state.ascSortByRank })
        // return {
        //     ...state,
        //     selected: selected,
        //     ascSortByRank: !state.ascSortByRank
        // }
        case actionTypes.SORT_BY_PRICE:
            selected = JSON.parse(JSON.stringify(state)).selected;//--bad for performance, change this
            selected.sort((a, b) => state.ascSortByPrice ? a.price - b.price : b.price - a.price);
            return updatedObj(state, { selected: selected, ascSortByPrice: !state.ascSortByPrice });
        // return {
        //     ...state,
        //     selected: selected,
        //     ascSortByPrice: !state.ascSortByPrice
        // }
        default: return state;
    }
}

export default reducer;