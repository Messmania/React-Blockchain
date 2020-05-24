import React from "react";

const currencies = (props) => {
    const multiple = props.sel && props.sel.length > 1;
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th onClick={props.sortByRank}>Rank</th>
                        <th onClick={props.sortByPrice}>Price(USD)</th>
                    </tr>
                </thead>
                <tbody>
                    {props.sel.map(e =>
                        <tr key={e.id}>
                            <td>{e.symbol}</td>
                            <td>{e.rank}</td>
                            <td>{e.price}</td>
                            {multiple ? <td onClick={() => props.delete(e.id)}> Delete</td> : null}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default currencies;