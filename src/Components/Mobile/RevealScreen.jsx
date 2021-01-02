import React, { Component } from 'react';
import { MobileContext } from './MobileContext';

class RevealScreen extends Component {
    static contextType = MobileContext;

    isSpy = () => {
        const { playerName, gameState } = this.context;
        for (let player of gameState.players) {
            if (player.name === playerName) {
                return player.isSpy;
            }
        }
    }

    spyList = () => {
        const { playerName, gameState } = this.context;
        let rows = [];
        for (let player of gameState.spies) {
            if (player === playerName) {
                continue;
            }
            rows.push(
                <li className="list-group-item list-group-item-dark lg lg-dark">
                    {player}
                </li>
            )
        }
        return (
            <div>
                <span>Teammates:</span>
                <ul className="list-group" style={{ margin: '12vw', textAlign: 'left', marginTop: '0px' }}>{rows}</ul>
            </div>
        )
    }

    render() {
        if (this.isSpy()) {
            return (
                <div className="centered" style={{ marginTop: '10vh' }}>
                    <h2>You are a </h2>
                    <h1>SPY</h1>
                    {this.spyList()}
                </div>
            )
        }

        return (
            <div className="centered" style={{ marginTop: '10vh' }}>
                <h2>You are </h2>
                <h1>RESISTANCE</h1>
            </div>
        );
    }
}

export default RevealScreen;