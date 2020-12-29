import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class VoteScreen extends Component {
    static contextType = MobileContext;

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes } = stateMachine.voteState;

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                    {player.name}
                    {votes[player.name] && <span className="badge badge-dark">Voted 🗳️</span>}
                </li>
            )
        }

        console.log("stateMachine");
        console.log(votes);

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    voteTeam = approve => {
        const { sessionId, playerName } = this.context;
        console.log("Voting on Conduct Mission for: " + sessionId);
        console.log("VOTE: ", approve);

        //Send Message
        this.context.ws.json({
            action: "vote",
            sessionId,
            playerName,
            approve
        });
        // this.setState({ loading: true });
    }

    createVoteButtons = () => {
        return (
            <div>
                <button type="button" className="btn sf-btn btn-outline-light" onClick={() => this.voteTeam(true)} style={{ position: 'absolute', bottom: '10%', left: '15%' }} >
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsCheckCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw' }}>
                        approve
                    </span>
                </button>

                <button type="button" className="btn sf-btn btn-outline-light" onClick={() => this.voteTeam(false)} style={{ position: 'absolute', bottom: '10%', right: '15%' }}>
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsXCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw', marginTop: '2vh' }}>
                        reject
                    </span>
                </button>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.createListGroup()}
                {this.createVoteButtons()}
            </div>
        )
    }
}
