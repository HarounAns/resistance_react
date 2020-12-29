import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import Loading from './Loading';
import CaptainScreen from './CaptainScreen';

export default class BuildTeam extends Component {
    static contextType = MobileContext;

    getCaptain = () => {
        const { gameState } = this.context;
        const { players, currentPlayerIndex } = gameState;

        return players[currentPlayerIndex].name
    }

    isCaptain = () => {
        const { playerName } = this.context;
        return this.getCaptain() === playerName;
    }

    render() {
        const { gameState } = this.context;
        const captain = this.getCaptain();

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
         
        return <div style={{marginTop: '15vh'}} className="pulsate">waiting for {captain} to select team</div>

    }
}
