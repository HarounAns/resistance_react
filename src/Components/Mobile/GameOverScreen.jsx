import React, { Component } from 'react';
import { MobileContext } from './MobileContext';


class GameOverScreen extends Component {
    static contextType = MobileContext;

    resistanceWins = () => {
        const { spies, resistance } = this.context.gameState;
        const r_players = resistance.map(player => {
            return (
                <li className="list-group-item list-group-item-dark lg lg-dark">
                    {player}
                    <span style={{ float: 'right' }}>🥇</span>
                </li>
            )
        });
        const s_players = spies.map(player => {
            return (
                <li className="list-group-item list-group-item-dark lg lg-dark r_success">
                    {player}
                    <span style={{ float: 'right' }}>😞</span>
                </li>
            )
        });

        return (
            <div style={{ marginTop: '5vh' }}>
                <h3>RESISTANCE WINS!</h3>
                <div>
                    <span>Resistance</span>
                    <ul className="list-group r_success" style={{ margin: '20px', marginTop: '0px' }}>{r_players}</ul>
                </div>
                <div>
                    <span>Spies</span>
                    <ul className="list-group" style={{ margin: '20px', marginTop: '0px' }}>{s_players}</ul>
                </div>
            </div>
        );
    }

    spiesWin = () => {
        const { spies, resistance } = this.context.gameState;
        const r_players = resistance.map(player => {
            return (
                <li className="list-group-item list-group-item-dark lg lg-dark">
                    {player}
                    <span style={{ float: 'right' }}>😞</span>
                </li>
            )
        });
        const s_players = spies.map(player => {
            return (
                <li className="list-group-item list-group-item-dark lg lg-dark">
                    {player}
                    <span style={{ float: 'right' }}>🥇</span>
                </li>
            )
        });

        return (
            <div style={{ marginTop: '5vh' }}>
                <h3>SPIES WIN! </h3>
                <div>
                    <span>Spies</span>
                    <ul className="list-group s_fail" style={{ margin: '20px', marginTop: '0px' }}>{s_players}</ul>
                </div>
                <div>
                    <span>Resistance</span>
                    <ul className="list-group" style={{ margin: '20px', marginTop: '0px' }}>{r_players}</ul>
                </div>
            </div>
        );
    }

    render() {
        const { winner } = this.context.gameState;

        return <div>
            {winner === 'RESISTANCE' ? this.resistanceWins() : this.spiesWin()}
            <button className="playbtn" type="submit" style={{ marginTop: '0' }}
             onClick={() => window.location.reload()}>NEW GAME</button>
        </div>
    }
}

export default GameOverScreen;