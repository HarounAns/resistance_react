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
                timeout: 1000, // 1 second
                maxAttempts: 50,
                onopen: this.handleOpen,
                onmessage: e => this.handleMessage(e),
                onreconnect: e => console.log("reconnecting...", e),
                onmaximum: e => console.log("Stop Attempting!", e),
                // onclose: e => this.handleClose(e),
                onerror: e => console.log("Error:", e)
            });

        this.context.setWebsocket(ws);
    }

    toggleFullScreen = () => {
        var doc = window.document;
        var docEl = doc.documentElement;

        var requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
        var cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;

        if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
            console.log('making full screen');
            try {
                requestFullScreen.call(docEl);
            } catch (error) {
                console.error('Could not make full screen');
                console.error(error);
            }
        }
        else {
            console.log('canceling full screen');
            cancelFullScreen.call(doc);
        }
    }

    handleMessage = event => {
        console.log('handling message');
        console.log(event);

        // ASSUMPTION: if event has data it was successful
        if (event.data) {
            console.log('event.data');
            console.log(event.data);
            const gameState = JSON.parse(event.data);

            if (!gameState.stateMachine) {
                console.log('INVALID GAMESTATE');
                return;
            }

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

    handleOpen = (e) => {
        console.log("connected:", e);
        const { sessionId, playerName } = this.context;

        if (!sessionId)
            return;

        // reconnecting so add player back
        this.context.ws.json({
            action: 'addPlayer',
            sessionId,
            playerName,
        })
    }

    // handleClose = event => {
    //     console.log('handling close');
    //     console.log(event);

    //     this.setState({WSdisconnected: true});
    // }

    currentStateChanged = (currentState) => {
        if (this.currentState === currentState)
            return false;

        this.currentState = currentState;
        return true;
    }

    createParty = () => {
        this.setState({ createParty: true });
        // this.toggleFullScreen();
    }

    joinParty = () => {
        this.setState({ joinParty: true })
        // this.toggleFullScreen();
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
                <button className="button6" style={{ width: '50vw', marginTop: '30vh' }} onClick={this.createParty} >Create Party</button>
                <button className="button6" style={{ width: '50vw', marginTop: '5vh' }} onClick={this.joinParty}> Join Party</button>
            </div>
        );
    }
}

export default Phone;