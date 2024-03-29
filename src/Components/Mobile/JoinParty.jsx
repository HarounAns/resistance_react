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
        const name = target.name;
        let value = target.value.toUpperCase();
        let forceAdd = false;

        if (value.startsWith('*')) {
            forceAdd = true;
        }

        // enforce rules where all values are capitalized, no special characters, and no spaces
        value = value.replace(/[^\w\s]/gi, "");
        value = value.replace(/\s/g, '');

        if (forceAdd) {
            value = `*${value}`;
        }

        this.setState({
            [name]: value,
            forceAdd
        }, () => console.log(this.state));
    }

    addPlayer = () => {
        const { name, sessionId, forceAdd } = this.state;
        this.context.ws.json({
            action: 'addPlayer',
            sessionId,
            playerName: name,
        })

        this.setState({ addedPlayer: true });
        this.context.setSessionId(sessionId);

        if (forceAdd) {
            this.context.setPlayerName(name.substring(1));            
            return;
        }

        this.context.setPlayerName(name);
    }

    render() {
        const { gameState } = this.context;
        const { addedPlayer, forceAdd } = this.state;

        if (!addedPlayer) {
            return (
                <div className="centered">
                    <form className="enterform">
                        <div>
                            <label for="fname">ROOM CODE
                        <br />
                                <input onChange={this.handleChange} value={this.state.sessionId}
                                    type="text" id="sessionId" name="sessionId"
                                    placeholder="ENTER 4-LETTER CODE" maxLength="4" />
                            </label>
                        </div>
                        <br />
                        <div>
                            <label for="lname">NAME
                        <br />
                                <input onChange={this.handleChange} value={this.state.name}
                                    type="text" id="name" name="name"
                                    placeholder="ENTER YOUR NAME" maxLength={forceAdd ? "11" : 10} />
                            </label>
                        </div>
                        <button className="playbtn" type="submit" onClick={this.addPlayer}>PLAY</button>
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