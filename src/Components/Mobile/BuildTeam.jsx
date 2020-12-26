import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import Loading from './Loading';
import CaptainScreen from './CaptainScreen';

export default class BuildTeam extends Component {
    static contextType = MobileContext;

    isCaptain = () => {
        const { gameState, playerName } = this.context;
        const { players, currentPlayerIndex } = gameState;

        return players[currentPlayerIndex].name === playerName;
    }

    render() {
        const { gameState } = this.context;
        if (!gameState) {
            return <Loading />
        }

        if (this.isCaptain()) {
            return (
                <div>
                    <CaptainScreen />
                </div>
            )
        }
        return <div>Waiting for the captain to select team</div>
    }
}
