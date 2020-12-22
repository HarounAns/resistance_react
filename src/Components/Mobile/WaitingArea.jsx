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

       return <Table list={list}/>
    }

    render() {
        const { isLeader } = this.props;
        const { gameState } = this.context;
        return (
            <div className="centered">
                <h1 style={{color: "white"}}>{gameState.sessionId}</h1>
                {this.table()}
                {isLeader && <button className="playbtn" type="submit" onClick={this.createGameState}>START GAME</button>}
            </div>
        );
    }
}

export default WaitingArea;