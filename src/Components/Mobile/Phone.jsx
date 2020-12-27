import React, { Component } from 'react';
import JoinParty from './JoinParty';
import CreateParty from './CreateParty';
import Sockette from 'sockette';
import { MobileContext } from './MobileContext';
import StateMachine from './StateMachine';
import 'bootstrap/dist/css/bootstrap.min.css';
import RevealScreen from './RevealScreen';

class Phone extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            joinParty: false,
            createParty: false
        };
    }

    componentDidMount = () => {
        // initiate socket connection
        let ws = new Sockette('wss://n2rlgnyw6h.execute-api.us-east-1.amazonaws.com/dev',
            {
                timeout: 300e3, // 5 mins
                maxAttempts: 1,
                onopen: e => {
                    console.log("connected:", e);
                    // this.setState({socketDisconnected: false});
                    // this.setupJoinRoom();
                },
                onmessage: e => this.handleMessage(e),
                onreconnect: e => console.log("Reconnecting...", e),
                onmaximum: e => console.log("Stop Attempting!", e),
                onclose: e => console.log("Closed!", e),
                onerror: e => console.log("Error:", e)
            });

        this.context.setWebsocket(ws);
    }

    handleMessage = event => {
        console.log('handling message');
        console.log(event);

        // ASSUMPTION: if event has data it was successful
        if (event.data) {
            console.log('event.data');
            console.log(event.data);
            this.context.setGameState(JSON.parse(event.data));
        }
    }

    render() {
        const { joinParty, createParty } = this.state;
        const { gameState } = this.context;
        
        if (gameState && gameState.allPlayersJoined) {
            return <StateMachine />
        }

        if (joinParty) {
            return <JoinParty />
        }

        if (createParty) {
            return <CreateParty />
        }

        return (
            <div className="centered">
                <button style={{ width: '50vw', marginTop: '30vh' }} className="button6" onClick={() => this.setState({ createParty: true })}>Create Party</button>
                <button style={{ width: '50vw', marginTop: '5vh' }} className="button6" onClick={() => this.setState({ joinParty: true })}>Join Party</button>

            </div>
        );
    }
}

export default Phone;