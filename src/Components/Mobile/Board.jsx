import React, { Component } from 'react';
import { MobileContext } from './MobileContext';


class Board extends Component {
    static contextType = MobileContext;

    numberCircles = () => {
        const { gameState } = this.context;
        const { board, numPlayers, missions } = gameState;
        const circles = [];

        for (let i in board) {
            const playersOnMission = board[i];

            let numberCircleCN = "numberCircle";
            if (missions[i] === 'S') {
                numberCircleCN += " r_success";
            }
            else if (missions[i] === 'F') {
                numberCircleCN += " s_fail";
            }

            if (parseInt(i) + 1 === 4 && numPlayers >= 7) {
                circles.push(
                    <div>
                        <div className={numberCircleCN}>
                            <span className="twoFails">Requires 2 Fails</span>
                            {playersOnMission}
                        </div>
                    </div>
                );
                continue;
            }

            circles.push(<div className={numberCircleCN}>{playersOnMission}</div>);
        }

        return (
            <div className="numberCircles">
                {circles}
            </div>
        )
    }

    voteTracker = () => {
        const { gameState } = this.context;
        const { failedVoteCounter } = gameState;
        const circles = [];

        for (let i = 1; i <= 5; i++) {
            let active = failedVoteCounter === i;
            const voteTrackerCN = active ? "votetrackerCircleActive" : "votetrackerCircle";

            if (i === 5) {
                circles.push(<div className={voteTrackerCN} style={{ border: '2px solid red' }}>5</div>);
                continue;
            }
            circles.push(<div className={voteTrackerCN}>{i}</div>)
        }

        return (
            <div className="votetracker">
                {circles}
            </div>
        )
    }

    render() {
        const { gameState } = this.context;
        const { failedVoteCounter, numPlayers, spies } = gameState;

        return (
            <div>
                <div className="board">
                    <div className="numPlayerBadge">{numPlayers} players • {spies.length} spies </div>
                    {failedVoteCounter === 5 && <div className="votingDisabled">Voting Disabled</div>}
                    {this.numberCircles()}
                    {this.voteTracker()}
                </div>
            </div>
        );
    }
}

export default Board;