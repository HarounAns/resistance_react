import React, { Component } from 'react';
import RevealScreen from './RevealScreen';

class ShowCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCard: false
        };
    }

    render() {
        const { showCard } = this.state;

        if (!showCard) {
            return (
                <div style={{ position: 'absolute', bottom: '14vh', left: '0', right: '0', margin: 'auto' }}>
                    <button className="playbtn"  
                        onClick={() => this.setState({ showCard: true })}>
                            SHOW CARD
                    </button>
                    <p>make sure no one is looking</p>
                </div>
            );
        }

        return (
            <div>
                <RevealScreen />
                <div style={{ position: 'absolute',  bottom: '19vh',  left: '0', right: '0', margin: 'auto' }}>
                    <button className="playbtn"  
                        onClick={() => this.setState({ showCard: false })}>
                            HIDE CARD
                    </button>
                </div>
            </div>
        )
    }
}

export default ShowCard;