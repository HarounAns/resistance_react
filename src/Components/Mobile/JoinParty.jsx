import React, { Component } from 'react';
import Loading from './Loading';
import WaitingArea from './WaitingArea';
import { MobileContext } from './MobileContext';


class JoinParty extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            name: '',
            sessionId: '',
            addedPlayer: false
        };
    }

    handleChange = async (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        }, () => console.log(this.state));
    }

    addPlayer = () => {
        const { name, sessionId } = this.state;
        this.context.ws.json({
            action: 'addPlayer',
            sessionId,
            playerName: name,
        })

        this.setState({ addedPlayer: true });
        this.context.setSessionId(sessionId);
    }

    render() {
        const { gameState } = this.context;
        const { addedPlayer } = this.state;

        if (!addedPlayer) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Room Code:
                        <br />
    
                            <input type="text" name="sessionId" value={this.state.sessionId} onChange={this.handleChange} />
                        </label>
                        <br />
                        <label>
                            Name:
                        <br />
    
                            <input type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <br />
                        <br />
                        <input type="button" value="Join Party" onClick={this.addPlayer} />
                    </form>
                </div>
            );
        }

        if (!gameState) {
            return <Loading />
        }

        return <WaitingArea isLeader={false} />
    }
}

export default JoinParty;