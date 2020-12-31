import React, { Component } from 'react'
import { MobileContext } from './MobileContext';
import SFCard from './SFCard';

async function delay(timeout) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), timeout)
    })
}

export default class ShowVoteConductMissionScreen extends Component {
    static contextType = MobileContext;

    constructor() {
        super();
        this.state = {
            isFlipped: [],
            allFlipped: false,
            team: null
        };
    }

    componentDidMount = () => {
        const { mission } = this.context.gameState.stateMachine.showMissionResultsState;
        const team = Object.values(mission);

        this.shuffle(team);
        this.setState({ team });

        setTimeout(() => {
            this.flipCards(() => {
                this.setState({ allFlipped: true });
            });
        }, 2000);
    }

    createCards = () => {
        let { isFlipped } = this.state;
        let cards = [];

        const { team } = this.state;
        for (let i = 0; i < team.length; i++) {
            cards.push(
                <SFCard isFlipped={isFlipped[i]} missionVote={team[i]} />
            )
        }
        return cards;
    }

    shuffle = array => {
        array.sort(() => Math.random() - 0.5);
    }

    flipCard = (i) => {
        let { isFlipped } = this.state;
        isFlipped[i] = !isFlipped[i];
        this.setState({ isFlipped });
    }

    flipCards = async (cb) => {
        const { team } = this.state;

        for (let i = 0; i < team.length; i++) {
            this.flipCard(i);
            await delay(500);
        }

        if (cb) {
            setTimeout(cb, 300);
        }
    }

    resultMessage = () => {
        const { allFlipped } = this.state;
        if (!allFlipped)
            return null;

        const { isSuccessful } = this.context.gameState.stateMachine.showMissionResultsState;
        const msg = isSuccessful ? 'SUCCESS' : 'FAILED';
        return <span style={{fontWeight: 'bold'}}>MISSION {msg}</span>
    }

    render() {
        const { team } = this.state;
        return (
            <div>
                <div className='cardPack'>
                    {team && this.createCards()}
                    {this.resultMessage()}
                </div>
            </div>
        );
    }
}
