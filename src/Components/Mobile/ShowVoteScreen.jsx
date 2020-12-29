import React, { Component } from 'react'
import { MobileContext } from './MobileContext';

export default class ShowVoteScreen extends Component {
    static contextType = MobileContext;

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes } = stateMachine.showVoteResultsState;

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                    {player.name}
                    {votes[player.name] === "A" ? <span className="badge badge-pill badge-success" style={{ width: '24vw' }}> Approved 🗸</span> : <span className="badge badge-pill badge-danger" style={{ width: '24vw' }}>Rejected ✗</span>}
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    isTeamSuccessful = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes } = stateMachine.showVoteResultsState;
        let numSuccess = 0;
        let numFail = 0;


        for (let player of players) {
            if (votes[player.name] === "A") {
                numSuccess++;
            }

            else {
                numFail++;
            }
        }

        if (numSuccess > numFail) {
            return <span style={{ fontSize: '10vw' }}>Team is Approved</span>
        }

        return <span style={{ fontSize: '10vw' }}>Team is Rejected</span>
    }

    render() {
        return (
            <div>
                {this.createListGroup()}
                {this.isTeamSuccessful()}
            </div>
        )
    }
}
