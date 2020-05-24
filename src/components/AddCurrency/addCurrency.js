import React from "react";

const addCurrency = (props) => {
    console.log("[AddCurency.js] props:", props);
    return (
        <div>
            <select value='def' onChange={props.selectHandler}>
                <option value='def' disabled>Select a currency</option>
                {props.unsel.map(e => <option value={e.id} key={e.id}>{e.name}</option>)}
            </select>
        </div>
    )
};

export default addCurrency;