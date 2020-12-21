import React, { Component } from 'react';
import { MobileContext } from './MobileContext';


class WaitingArea extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {

        };
    }

    table = () => {
        const { gameState } = this.context;
        if (!gameState.players) {
            return;
        }

        let rows = [];

        for (let player of gameState.players) {
            rows.push(
                <tr>
                    <td>{player.name}</td>
                </tr>
            )
        }

        return (
            <table className="waitingTable">
                <tr>
                    <th>Players</th>
                </tr>
                {rows}
            </table>
        )
    }

    render() {
        const { isLeader } = this.props;
        const { gameState } = this.context;
        return (
            <div>
                <h1>{gameState.sessionId}</h1>
                {this.table()}
                {isLeader && <button onClick={() => console.log('gameState', gameState)}>Start Game</button>}
            </div>
        );
    }
}

export default WaitingArea;