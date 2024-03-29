import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class VoteScreen extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            btn: null,
            cannotRejectMsg: false
        };
    }

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { votes, team } = stateMachine.voteState;

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center lg lg-dark">
                    <div>
                        {player.name}
                    </div>
                    <div>
                        {team.includes(player.name) && <span className="badge badge-light" style={{ marginLeft: '5px' }}>ON TEAM</span>}
                        {votes[player.name] && <span className="badge badge-dark visible-lg-inline">Voted 🗳️</span>}
                    </div>
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '15px' }}>{listItems}</ul>
        )
    }

    voteTeam = (approve, btn) => {
        if (this.state.btn === btn)
            return;

        const { sessionId, playerName, gameState } = this.context;

        if (gameState.failedVoteCounter >= 5 && btn === 'reject') {
            this.setState({ cannotRejectMsg: true },
                () => {
                    setTimeout(() => {
                        this.setState({ cannotRejectMsg: false });
                    }, 3000);
                }
            )
            return;
        }

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

        const { gameState } = this.context;
        if (gameState.failedVoteCounter >= 5 && btn === 'reject') {
            return "btn sf-btn-disabled disabled";
        }

        return "btn sf-btn";
    }

    createVoteButtons = () => {
        const { cannotRejectMsg } = this.state;

        return (
            <div>
                {cannotRejectMsg && <span style={{ fontSize: '2vh', position: 'absolute', bottom: '34%', margin: 'auto', left: '0', right: '0' }}>5 Fails. Cannot Reject This Team</span>}
                <button type="button" className={this.getBtnCN("approve")} style={{ position: 'absolute', bottom: '8%', left: '15%' }} onClick={() => this.voteTeam(true, "approve")} >
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsCheckCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3vw' }}>
                        approve
                    </span>
                </button>

                <button type="button" className={this.getBtnCN("reject")} style={{ position: 'absolute', bottom: '8%', right: '15%' }} onClick={() => this.voteTeam(false, "reject")} >
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsXCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '3vw', marginTop: '2vh' }}>
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
