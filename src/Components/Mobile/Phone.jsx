import React, { Component } from 'react';
import JoinParty from './JoinParty';
import CreateParty from './CreateParty';
import Sockette from 'sockette';
import { MobileContext } from './MobileContext';
import Game from './Game';
import { screens } from "./Screens";
import beep from '../../Sounds/beep.mp3';

import 'bootstrap/dist/css/bootstrap.min.css';
import DisconnectScreen from './DisconnectScreen';

let beepAudio = new Audio(beep);
beepAudio.volume = 0.5;

class Phone extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            joinParty: false,
            createParty: false,
            WSdisconnected: false
        };

        this.currentState = null;
    }

    componentDidMount = () => {
        // initiate socket connection
        let ws = new Sockette('wss://n2rlgnyw6h.execute-api.us-east-1.amazonaws.com/dev',
            {
                timeout: 300e3, // 5 mins
                maxAttempts: 1,
                onopen: e => console.log("connected:", e),
                onmessage: e => this.handleMessage(e),
                onreconnect: e => console.log("Reconnecting...", e),
                onmaximum: e => console.log("Stop Attempting!", e),
                onclose: e => this.handleClose(e),
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
            const gameState = JSON.parse(event.data);
            this.context.setGameState(gameState);

            if (this.currentStateChanged(gameState.stateMachine.currentState)) {
                // change screen
                this.context.setScreen(screens.home);

                try {
                    // vibrate, if possible, for 200ms
                    navigator.vibrate(200);
                } catch (error) {
                    console.log('Could not vibrate');
                }

                // play sound if possible
                try {
                    beepAudio.play();
                } catch (error) {
                    console.log('Could not play beep');
                }
            }
        }
    }

    handleClose = event => {
        console.log('handling close');
        console.log(event);

        this.setState({WSdisconnected: true});
    }

    currentStateChanged = (currentState) => {
        if (this.currentState === currentState) 
            return false;

        this.currentState = currentState;
        return true;
    }

    render() {
        const { joinParty, createParty, WSdisconnected } = this.state;
        const { gameState } = this.context;

        if (WSdisconnected) {
            return <DisconnectScreen />
        }

        if (gameState && gameState.allPlayersJoined) {
            return <Game />
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