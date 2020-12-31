import React, { Component } from 'react';
import { MobileContext } from './MobileContext';


class ActiveTable extends Component {
    static contextType = MobileContext;

    render() {
        const { players, currentPlayerIndex } = this.context.gameState;
        if (!players.length) 
            return null;

        let rows = [];
        let className;
        for (let i in players) {
            className = parseInt(i) !== currentPlayerIndex ? "list-group-item list-group-item-dark lg lg-dark" : "list-group-item active lg lg-active";
            rows.push(
                <li className={className}>
                    {players[i].name}
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '10px', textAlign: 'left', marginTop: '3vh' }}>{rows}</ul>
        )
    }
}

export default ActiveTable;