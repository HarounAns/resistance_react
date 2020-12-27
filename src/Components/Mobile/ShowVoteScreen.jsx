import React, { Component } from 'react'
import { MobileContext } from './MobileContext';

export default class ShowVoteScreen extends Component {
    static contextType = MobileContext;

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes } = stateMachine.voteState;

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    {player.name}
                    {votes[player.name] === "A" ?  <span className="badge badge-pill badge-success" style={{ width:'24vw'}}> Approved 🗸</span> : <span className="badge badge-pill badge-danger" style={{ width:'24vw'}}>Rejected ✗</span>}
                </li>
            )
        }

        console.log("stateMachine");
        console.log(votes);

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    render() {
        return (
            <div>
                { this.createListGroup()}
            </div>
        )
    }
}
