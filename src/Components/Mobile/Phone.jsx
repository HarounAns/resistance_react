import React, { Component } from 'react';
import JoinParty from './JoinParty';
import CreateParty from './CreateParty';
import Sockette from 'sockette';
import { MobileContext } from './MobileContext';
import Game from './Game';
import { screens } from "./Screens";
import beep from '../../Sounds/beep.mp3';

import 'bootstrap/dist/css/bootstrap.min.css';
import CaptainScreen from './CaptainScreen';

let beepAudio = new Audio(beep);
beepAudio.volume = 0.5;

class Phone extends Component {
    static contextType = MobileContext;

    constructor(props) {
        super(props);

        this.state = {
            joinParty: false,
            createParty: false
        };

        this.currentState = null;
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

    currentStateChanged = (currentState) => {
        if (this.currentState === currentState) 
            return false;

        this.currentState = currentState;
        return true;
    }

    render() {
        const { joinParty, createParty } = this.state;
        const { gameState } = this.context;

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