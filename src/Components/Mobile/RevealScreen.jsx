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
        let teammates = [];
        for (let player of gameState.spies) {
            if (player === playerName) {
                continue;
            }
            teammates.push(<p>➤ {player}</p>)
        }
        return (
            <div>
                <h5>Your Teammates:</h5>
                {teammates}
            </div>
        )
    }

    render() {
        if (this.isSpy()) {
            return (
                <div className="centered" style={{marginTop: '10vh'}}>
                    <h1>You are a SPY</h1>
                    {this.spyList()}
                </div>
            )
        }

        return (
            <div className="centered" style={{marginTop: '10vh'}}>
                <h1>You are RESISTANCE</h1>
            </div>
        );
    }
}

export default RevealScreen;