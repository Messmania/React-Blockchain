export const ADD_CURRENCY = "ADD_CURRENCY";
export const REMOVE_CURRENCY = "REMOVE_CURRENCY";
export const SHOW_ALL = "SHOW_ALL";
export const SORT_BY_RANK = "SORT_BY_RANK";
export const SORT_BY_PRICE = "SORT_BY_PRICE";

export const add = (id) => {
    return { type: ADD_CURRENCY, id }
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