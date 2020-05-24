import axios from "axios";
import { sanitizeData } from "../../utils/general";

export const ADD_CURRENCY = "ADD_CURRENCY";
export const REMOVE_CURRENCY = "REMOVE_CURRENCY";
export const SHOW_ALL = "SHOW_ALL";
export const SORT_BY_RANK = "SORT_BY_RANK";
export const SORT_BY_PRICE = "SORT_BY_PRICE";

const syncAdd = (id, newEntry) => {
    return { type: ADD_CURRENCY, id, newEntry }
}
export const add = (id) => {
    return (dispatch) => {
        //--Fetch it on every select, because bitcoin prices change, so user wants to see the latest value when it is added to the table
        axios.get(`/coinmarketcap/quotes?id=${id}`)
            .then(response => {
                let newEntryForTable = sanitizeData(response.data.data)[0];
                dispatch(syncAdd(id, newEntryForTable));
            });
    }
}

export const remove = (id) => {
    return { type: REMOVE_CURRENCY, id }
}

export const show = (sel, unsel) => {
    return { type: SHOW_ALL, sel, unsel }
}

export const sortByRank = () => {
    return { type: SORT_BY_RANK }
}

export const sortByPrice = () => {
    return { type: SORT_BY_PRICE }
}