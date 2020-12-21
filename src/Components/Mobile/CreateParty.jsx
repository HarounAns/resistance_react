import React, { Component } from 'react';
import WaitingArea from './WaitingArea';
import { MobileContext } from './MobileContext';


import Loading from './Loading';

class CreateParty extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            sessionId: '',
            name: '',
            createdGameState: false,
        };

        this.sessionId = null;
    }

    componentDidMount = () => {
        this.createSessionId();
    }

    createSessionId = () => {
        // randomly generates 4 letter code
        const length = 4;
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        this.context.setSessionId(result);
    }

    handleChange = async (event) => {
        await this.setState({ name: event.target.value });
    }

    createGameState = () => {
        const sessionId = this.context.sessionId;
        console.log("Creating Game State with " + sessionId);

        //Send Message
        this.context.ws.json({
            action: "createGameState",
            playerName: this.state.name,
            sessionId
        });

        this.setState({ createdGameState: true });
    }

    render() {
        const { createdGameState } = this.state;
        const { gameState } = this.context;

        if (!createdGameState) {
            return (
                <div>
                    <form>
                        <label>
                            Name:
                            <input type="text" value={this.state.name} onChange={this.handleChange} />
                        </label>
                        <input type="button" value="Create Party" onClick={this.createGameState} />
                    </form>
                </div>
            );
        }

        if (!gameState) {
            return <Loading />
        }

        return <WaitingArea isLeader={true} />
    }
}

export default CreateParty;