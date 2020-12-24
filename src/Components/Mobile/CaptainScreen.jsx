import React, { Component } from 'react'
import { MobileContext } from './MobileContext';

export default class CaptainScreen extends Component {
    static contextType = MobileContext;

    createListGroup = () => {
        const { gameState } = this.context;
        const { players } = gameState;
        
        const listItems = players.map((player) =>
            <li className="list-group-item">{player.name}</li>
        );

        return (
            <ul className="list-group" style={{margin: '10px'}}>{ listItems }</ul>
        )
    }
    render() {

        const { gameState } = this.context;
        const { players, board, turn } = gameState;
        const numPlayersOnMission = board[turn];

        return (
            <div>
                pick {numPlayersOnMission} to go on the mission
                { this.createListGroup()}
            </div>
        )
    }
}
