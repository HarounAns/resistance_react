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
        const target = event.target;
        const name = target.name;
        let value = target.value.toUpperCase();

        // enforce rules where all values are capitalized, no special characters, and no spaces
        value = value.replace(/[^\w\s]/gi, "");
        value = value.replace(/\s/g, '');

        this.setState({
            [name]: value
        }, () => console.log(this.state));
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
        this.context.setPlayerName(this.state.name);
    }

    render() {
        const { createdGameState } = this.state;
        const { gameState } = this.context;

        if (!createdGameState) {
            return (
                <div className="centered">
                    <form style={{ marginTop: '40vh' }} className="enterform">
                        <div>
                            <input onChange={this.handleChange} value={this.state.name}
                                type="text" id="name" name="name"
                                placeholder="ENTER YOUR NAME" maxLength="10" />
                        </div>
                        <button className="playbtn" type="submit" onClick={this.createGameState}>PLAY</button>
                    </form>
                </div>
            )
        }

        if (!gameState) {
            return <Loading />
        }

        return <WaitingArea isLeader={true} />
    }
}

export default CreateParty;