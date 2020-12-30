import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class VoteScreen extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            btn: null
        };
    }

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes } = stateMachine.voteState;

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center lg  lg-dark">
                    {player.name}
                    {votes[player.name] && <span className="badge badge-dark">Voted 🗳️</span>}
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    voteTeam = (approve, btn) => {
        if (this.state.btn === btn)
            return;

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

        this.setState({ btn });
    }

    getBtnCN = (btn) => {
        if (this.state.btn === btn) {
            return "btn sf-btn-active";
        }

        return "btn sf-btn"
    }

    createVoteButtons = () => {
        return (
            <div>
                <button type="button" className={this.getBtnCN("approve")} style={{ position: 'absolute', bottom: '8%', left: '15%' }} onClick={() => this.voteTeam(true, "approve")} >
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsCheckCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw' }}>
                        approve
                    </span>
                </button>

                <button type="button" className={this.getBtnCN("reject")} style={{ position: 'absolute', bottom: '8%', right: '15%' }} onClick={() => this.voteTeam(false, "reject")} >
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
            <div style={{ marginTop: '3vh' }}>
                {this.createListGroup()}
                {this.createVoteButtons()}
            </div>
        )
    }
}
