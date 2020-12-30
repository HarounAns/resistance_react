import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class VoteConductMissionScreen extends Component {
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
        const { mission } = stateMachine.conductMissionState;

        const team = Object.keys(mission);

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center lg lg-dark">
                    {player.name}
                    {team.includes(player.name) && <span className="badge badge-dark ">ON TEAM</span>}
                </li>
            )
        }

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    voteConductMission = (success, btn) => {
        if (this.state.btn === btn)
            return;

        const { sessionId, playerName, gameState } = this.context;

        // if resistance tries to vote fail set msg saying only spies can fail missions
        if (gameState.resistance.includes(playerName) && btn === 'fail') {
            this.setState({ spiesOnlyMsg: true },
                () => {
                    setTimeout(() => {
                        this.setState({ spiesOnlyMsg: false });
                    }, 3000);
                }
            )
            return;
        }

        console.log("Voting on Conduct Mission for: " + sessionId);
        console.log("VOTE: ", success);

        //Send Message
        this.context.ws.json({
            action: "conductMission",
            sessionId,
            playerName,
            success
        });

        this.setState({ btn });
    }

    getBtnCN = (btn) => {
        if (this.state.btn === btn) {
            return "btn sf-btn-active";
        }

        return "btn sf-btn"
    }

    createMissionButtons = () => {
        if (this.isPlayerOnMission()) {
            const { spiesOnlyMsg } = this.state;

            return (
                <div>
                    {spiesOnlyMsg && <span style={{ fontSize: '2vh', position: 'absolute', bottom: '34%', margin: 'auto', left: '0', right: '0' }}>Only Spies Can Fail Missions</span>}
                    <button type="button" className={this.getBtnCN('success')} onClick={() => this.voteConductMission(true, 'success')} style={{ position: 'absolute', bottom: '8%', left: '15%' }} >
                        <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                            <BsCheckCircle />
                        </span>
                        <br />
                        <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw' }}>
                            success
                        </span>
                    </button>

                    <button type="button" className={this.getBtnCN('fail')} onClick={() => this.voteConductMission(false, 'fail')} style={{ position: 'absolute', bottom: '8%', right: '15%' }}>
                        <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                            <BsXCircle />
                        </span>
                        <br />
                        <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw', marginTop: '2vh' }}>
                            fail
                        </span>
                    </button>
                </div>
            )
        }
    }

    isPlayerOnMission = () => {
        const { gameState, playerName } = this.context;
        const { stateMachine } = gameState;
        const { mission } = stateMachine.conductMissionState;
        const team = Object.keys(mission);

        return team.includes(playerName);
    }

    render() {
        return (
            <div style={{ marginTop: '3vh' }}>
                {this.createListGroup()}
                {this.createMissionButtons()}
            </div>
        )
    }
}
