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
    "currentPlayerIndex": 1,
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
            "connectionId": "YB0OJfUSoAMCLIQ=",
            "isSpy": true,
            "name": "HAMZA"
        },
        {
            "connectionId": null,
            "isSpy": true,
            "name": "IBRAHIM"
        },
        {
            "connectionId": null,
            "isSpy": false,
            "name": "HAROUN"
        },
        {
            "connectionId": null,
            "isSpy": false,
            "name": "ZAINAB"
        },
        {
            "connectionId": null,
            "isSpy": false,
            "name": "ISMAIL"
        }
    ],
    "rerender": true,
    "resistance": [
        "HAROUN",
        "ZAINAB",
        "ISMAIL"
    ],
    "sessionId": "EPWI",
    "spies": [
        "HAMZA",
        "IBRAHIM"
    ],
    "stateMachine": {
        "buildTeamState": {
            "currentState": true
        },
        "conductMissionState": {

        },
        "currentState": "buildTeamState",
        "gameOverState": {

        },
        "voteState": {

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