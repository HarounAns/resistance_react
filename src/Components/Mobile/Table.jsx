import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { list } = this.props;

        let rows = [];
        for (let elem of list) {
            rows.push(
                <p>➤ {elem}</p>
            )
        }

        return (
            <div style={{ color: 'white' }}>
                <h5>Players: </h5>
                {rows}
            </div>
        )

        // for (let elem of list) {
        //     rows.push(
        //         <tr key={elem}>
        //             <td>{elem}</td>
        //         </tr>
        //     )
        // }
        // return (
        // <table className="waitingTable">
        //     <tr>
        //         <th>Players</th>
        //     </tr>
        //     {rows}
        // </table>
        // )
    }
}

export default Table;