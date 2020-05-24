import * as actionTypes from "./actions";

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
        case actionTypes.SHOW_ALL:
            return {
                ...state,
                selected: action.sel,
                unSelected: action.unsel
            }
        case actionTypes.ADD_CURRENCY:
            match = state.unSelected.filter(e => e.id === id)[0]; //--find item from dropdown
            notMatch = state.unSelected.filter(e => e.id !== id); //-- other items from dropdown
            return {
                ...state,
                selected: state.selected.concat(match),
                unSelected: notMatch
            }
        case actionTypes.REMOVE_CURRENCY:
            match = state.selected.filter(e => e.id === id)[0]; //--find item from table
            notMatch = state.selected.filter(e => e.id !== id); //--other items in table
            return {
                ...state,
                selected: notMatch,
                unSelected: state.unSelected.concat(match)
            }
        case actionTypes.SORT_BY_RANK:
            selected = JSON.parse(JSON.stringify(state)).selected;
            console.log("Sort!:", selected)
            selected.sort((a, b) => state.ascSortByRank ? a.rank - b.rank : b.rank - a.rank);
            return {
                ...state,
                selected: selected,
                ascSortByRank: !state.ascSortByRank
            }
        case actionTypes.SORT_BY_PRICE:
            selected = JSON.parse(JSON.stringify(state)).selected;
            selected.sort((a, b) => state.ascSortByPrice ? a.price - b.price : b.price - a.price);
            return {
                ...state,
                selected: selected,
                ascSortByPrice: !state.ascSortByPrice
            }
        default: return state;
    }
}

export default reducer;