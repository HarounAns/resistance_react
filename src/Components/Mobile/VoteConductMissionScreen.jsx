import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import { BsXCircle, BsCheckCircle } from "react-icons/bs";

export default class VoteConductMissionScreen extends Component {
    static contextType = MobileContext;

    createListGroup = () => {
        const { gameState } = this.context;
        const { players, stateMachine } = gameState;
        const { mission } = stateMachine.conductMissionState;

        const team = Object.keys(mission);

        let listItems = [];
        for (let player of players) {
            listItems.push(
                <li className="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">
                    {player.name}
                    {team.includes(player.name) && <span className="badge badge-dark ">ON TEAM</span>}
                </li>
            )
        }
        // console.log(Object.keys(mission));

        return (
            <ul className="list-group" style={{ margin: '10px' }}>{listItems}</ul>
        )
    }

    voteConductMission = success => {
        const {sessionId, players } = this.context;
        console.log("Voting on Conduct Mission for: " + sessionId);
        console.log("VOTE: ", success);
        
        //Send Message
        this.context.ws.json({
            action: "conductMission",
            sessionId,

            success
        });
        // this.setState({ loading: true });
    }

    render() {
        return (
            <div>
                { this.createListGroup()}
                <button type="button" className="btn sf-btn btn-outline-light" onClick={() => this.voteConductMission(true)} style={{ position: 'absolute', bottom: '10%', left: '15%' }} >
                    <span style={{ fontSize: '10vw', fontWeight: 'bold' }}>
                        <BsCheckCircle />
                    </span>
                    <br />
                    <span style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '4.5vw' }}>
                        success
                    </span>
                </button>

                <button type="button" className="btn sf-btn btn-outline-light" onClick={() => this.voteConductMission(false)} style={{ position: 'absolute', bottom: '10%', right: '15%' }}>
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
