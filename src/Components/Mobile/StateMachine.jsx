import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import BuildTeam from './BuildTeam';
import VoteScreen from './VoteScreen';
import ShowVoteScreen from './ShowVoteScreen';
import RevealScreen from './RevealScreen';
import VoteConductMissionScreen from './VoteConductMissionScreen';
import ShowVoteConductMissionScreen from './ShowVoteConductMissionScreen';
import GameOverScreen from './GameOverScreen';

export default class StateMachine extends Component {
    static contextType = MobileContext;

    render() {
        const { playerName, gameState } = this.context;
        const { currentState } = gameState.stateMachine;

        if (currentState === 'gameOverState') {
            return <GameOverScreen />;
        }

        if (currentState === 'revealState') {
            return <RevealScreen />;
        }

        if (currentState === 'buildTeamState') {
            return <BuildTeam />;
        }

        if (currentState === 'voteState') {
            return <VoteScreen />;
        }

        if (currentState === 'showVoteResultsState') {
            return <ShowVoteScreen />;
        }

        if (currentState === 'conductMissionState') {
            return <VoteConductMissionScreen />;
        }

        if (currentState === 'showMissionResultsState') {
            return <ShowVoteConductMissionScreen />;
        }

        if (currentState === 'showMissionResultsState') {
            return (
                <ShowVoteConductMissionScreen />
            )
        }

        return (
            <div style={{ color: 'white' }}>

                Hello { playerName}
            </div >
        )
    }
}