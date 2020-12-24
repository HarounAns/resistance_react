import React, { Component } from 'react';
import { MobileContext } from './MobileContext';
import Table from './Table';


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

        let list = [];
        for (let player of gameState.players) {
            list.push(player.name);
        }
        return <Table list={list} />
    }

    startGame = () => {
        const sessionId = this.context.sessionId;

        this.context.ws.json({
            action: "startGame",
            sessionId
        });
    }

    render() {
        const { isLeader } = this.props;
        const { gameState } = this.context;
        const { players } = gameState;

        return (
            <div className="centered">
                <h1 style={{ color: "white" }}>{gameState.sessionId}</h1>
                {this.table()}
                {isLeader && players && players.length >= 5 && <button className="playbtn" type="submit" onClick={this.startGame}>START GAME</button>}
                {(players && players.length < 5) && <div className="pulsate" style={{ color: '#fff' }} >YOU NEED 5 PLAYERS TO START</div>}
                {(!isLeader && players && players.length >= 5) && <div className="pulsate" style={{ color: '#fff' }} >WAITING FOR LEADER TO START GAME</div>}
            </div>
        );
    }
}

export default WaitingArea;