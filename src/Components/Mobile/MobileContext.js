import React, { useState } from "react";
const testGameState = {
    "allPlayersJoined": true,
    "board": [
        2,
        3,
        2,
        3,
        3
    ],
    "currentPlayerIndex": 4,
    "failedVoteCounter": 0,
    "missions": [
        null,
        null,
        null,
        null,
        null
    ],
    "numPlayers": 5,
    "players": [
        {
            "connectionId": "YESn0e43oAMCLyw=",
            "isSpy": false,
            "name": "HAROUN"
        },
        {
            "connectionId": null,
            "isSpy": false,
            "name": "IBRAHIM"
        },
        {
            "connectionId": null,
            "isSpy": false,
            "name": "DOMAIN"
        },
        {
            "connectionId": null,
            "isSpy": true,
            "name": "DEV_DOMAIN"
        },
        {
            "connectionId": null,
            "isSpy": true,
            "name": "1"
        }
    ],
    "rerender": true,
    "resistance": [
        "HAROUN",
        "IBRAHIM",
        "DOMAIN"
    ],
    "sessionId": "WVYV",
    "spies": [
        "DEV_DOMAIN",
        "1"
    ],
    "stateMachine": {
        "buildTeamState": {

        },
        "conductMissionState": {

        },
        "currentState": "voteState",
        "gameOverState": {

        },
        "voteState": {
            "allPlayersVoted": false,
            "currentState": true,
            "team": [
                "HAROUN",
                "DOMAIN"
            ],
            "votes": {
                "1": "R",
                "DEV_DOMAIN": "R",
                "DOMAIN": "R",
                "HAROUN": "R",
                "IBRAHIM": "A"
            }
        }
    },
    "turn": 0
}


export const MobileContext = React.createContext();

export const MobileProvider = ({
    children
}) => {
    const [sessionId, setSessionId] = useState('');
    // const [gameState, setGameState] = useState(null);

    // THIS LINE IS FOR DEBUGGING PURPOSES
    const [gameState, setGameState] = useState(testGameState);
    const [ws, setWebsocket] = useState(null);
    const [playerName, setPlayerName] = useState('');

    return (
        <MobileContext.Provider
            value={{
                sessionId,
                gameState,
                setSessionId,
                setGameState,
                ws,
                setWebsocket,
                playerName,
                setPlayerName
            }}
        >
            {children}
        </MobileContext.Provider>
    );
}