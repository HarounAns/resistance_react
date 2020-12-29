import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import Loading from './Loading';

export default class CaptainScreen extends Component {
    static contextType = MobileContext;
    constructor(props) {
        super(props);

        this.state = {
            activePlayers: []
        };
    }

    createListGroup = () => {
        const { gameState } = this.context;
        const { players } = gameState;
        const { activePlayers } = this.state;

        const listItems = players.map((player) =>
            <li className={activePlayers.includes(player.name) ? "list-group-item active" : "list-group-item list-group-item-dark"}
                onClick={() => this.toggleActivePlayer(player.name)}>
                {player.name}
            </li>
        );

        return (
            <ul className="list-group" style={{ margin: '10px', textAlign: 'left' }}>{listItems}</ul>
        )
    }

    toggleActivePlayer = player => {
        const { gameState } = this.context;
        const { board, turn } = gameState;
        const numPlayersOnMission = board[turn];

        let { activePlayers } = this.state;
        if (activePlayers.includes(player)) {
            activePlayers.splice(activePlayers.indexOf(player), 1);
        }
        else {
            if (activePlayers.length >= numPlayersOnMission) {
                return;
            }

            activePlayers.push(player);
        }

        this.setState({ activePlayers }, () => console.log(this.state));
    }

    chooseTeam = () => {
        const sessionId = this.context.sessionId;
        console.log("Choosing Team for " + sessionId);

        //Send Message
        this.context.ws.json({
            action: "chooseTeam",
            sessionId,
            team: this.state.activePlayers
        });
        this.setState({ loading: true });
    }

    render() {
        const { activePlayers, loading } = this.state;
        const { gameState } = this.context;
        const { board, turn } = gameState;

        if (loading)
            return <Loading />

        const numPlayersOnMission = board[turn];
        return (
            <div className="centered">
                <span style={{ color: "white" }}>pick {numPlayersOnMission} to go on the mission</span>
                {this.createListGroup()}
                {activePlayers.length === numPlayersOnMission && <button className="playbtn" type="button" onClick={this.chooseTeam}>CHOOSE TEAM</button>}
            </div>
        )
    }
}
