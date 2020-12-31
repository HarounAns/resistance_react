import React, { Component } from 'react';

class Table extends Component {
    render() {
        const { list } = this.props;
        if (!list.length) 
            return null;

        let rows = [];
        for (let elem of list) {
            rows.push(
                <li className="list-group-item list-group-item-dark lg lg-dark">
                    {elem}
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '10px', textAlign: 'left' }}>{rows}</ul>
        )
    }
}

export default Table;