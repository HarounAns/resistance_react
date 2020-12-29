import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import BuildTeam from './BuildTeam';
import VoteScreen from './VoteScreen';
import ShowVoteScreen from './ShowVoteScreen';
import RevealScreen from './RevealScreen';

export default class StateMachine extends Component {
    static contextType = MobileContext;

    render() {
        const { playerName, gameState } = this.context;
        const { currentState } = gameState.stateMachine;

        if (currentState === 'gameOverState') {
            return (
                <div>
                    Game Over
                </div>
            )
        }

        if (currentState === 'revealState') {
            return <RevealScreen />      
        }

        if (currentState === 'buildTeamState') {
            return <BuildTeam />      
        }

        if (currentState === 'voteState') {
            return (
                <VoteScreen />
            )
        }

        if (currentState === 'showVoteResultsState') {
            return (
                <ShowVoteScreen />
            )
        }

        if (currentState === 'conductMissionState') {
            return (
                <div>
                    conduct Mission
                </div>
            )
        }

        return (
            <div style={{ color: 'white' }}>

                Hello { playerName }
            </div >
        )
    }
}
