import React from "react";
import "./currencies.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons'

const currencies = (props) => {
    const multiple = props.sel && props.sel.length > 1;
    return (
        <div className="tableContainer">
            <table>
                <thead>
                    <tr>
                        <th>Symbol</th>
                        <th
                            onClick={props.sortByRank}>
                            Rank
                            <FontAwesomeIcon icon={!props.ascRank ? faCaretUp : faCaretDown} />
                        </th>
                        <th
                            onClick={props.sortByPrice}>
                            Price(USD)
                            <FontAwesomeIcon icon={!props.ascPrice ? faCaretUp : faCaretDown} />
                        </th>
                        {multiple ? <th></th> : null}
                    </tr>
                </thead>
                <tbody>
                    {props.sel.map(e =>
                        <tr key={e.id}>
                            <td>{e.symbol}</td>
                            <td>{e.rank}</td>
                            <td>{e.price}</td>
                            {multiple ? <td><button onClick={() => props.delete(e.id)}><FontAwesomeIcon icon={faTrash} /></button></td> : null}
                        </tr>)
                    }
                </tbody>
            </table>
        </div>
    )
}

export default currencies;