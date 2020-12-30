import React, { Component } from 'react';
import ReactCardFlip from 'react-card-flip';
import SFCardFront from './SFCardFront';
import SFCardBack from './SFCardBack';

export default class SFCard extends Component {
    constructor() {
        super();
        this.state = {
            isFlipped: false
        };
    }

    render() {
        const { isFlipped, missionVote } = this.props;
        return (
                // NOTE: In-line styling is necessary to remove white background, reason: unknown
                <div className="card" style={{background:'rgba(0, 0, 0, 0)'}}>
                    <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
                        <div>
                            <SFCardBack />
                        </div>

                        <div>
                            <SFCardFront missionVote = {missionVote} />
                        </div>
                    </ReactCardFlip>
                </div>
        )
    }
}
