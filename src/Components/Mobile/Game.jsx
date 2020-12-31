import React, { Component } from 'react';
import Navbar from './Navbar';
import { screens } from "./Screens";
import StateMachine from "./StateMachine";
import Board from "./Board";
import ActiveTable from "./ActiveTable";
import { MobileContext } from './MobileContext';

class Game extends Component {
    static contextType = MobileContext;

    render() {
        const { screen, sessionId } = this.context;

        return (
            <div style={{ height: "100%" }}>
                <span className="sessionBadge">{sessionId || "TEST"}</span>
                {screen === screens.home &&
                    <StateMachine />
                }
                {screen === screens.board &&
                    <Board />
                }
                {screen === screens.table &&
                    <ActiveTable />
                }
                <Navbar />
            </div>
        );
    }
}

export default Game;