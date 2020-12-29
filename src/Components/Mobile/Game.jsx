import React, { Component } from 'react';
import Navbar from './Navbar';
import { screens } from "./Screens";
import StateMachine from "./StateMachine";
import Board from "./Board";


class Game extends Component {
    constructor(props) {
        super(props);

        this.state = {
            screen: screens.home
        };
    }

    setScreen = screen => {
        this.setState({ screen });
    }

    render() {
        const { screen } = this.state;
        return (
            <div style={{ height: "100%" }}>
                {screen === screens.home &&
                    <StateMachine />
                }
                {screen === screens.board &&
                    <Board />
                }
                <Navbar setScreen={this.setScreen} screen={screen} />
            </div>
        );
    }
}

export default Game;