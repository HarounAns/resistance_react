import React, { useState } from "react";
import { screens } from "./Screens";

const testGameState = {
  "allPlayersJoined": true,
  "sessionId": "RERW",
  "spies": [
    "DOMAIN",
    "DEV_DOMAIN"
  ],
  "players": [
    {
      "name": "HAROUN",
      "connectionId": "YYDsdcFYIAMCEfw=",
      "isSpy": false
    },
    {
      "name": "IBRAHIM",
      "connectionId": null,
      "isSpy": false
    },
    {
      "name": "DOMAIN",
      "connectionId": null,
      "isSpy": true
    },
    {
      "name": "DEV_DOMAIN",
      "isSpy": true
    },
    {
      "name": "1",
      "connectionId": null,
      "isSpy": false
    }
  ],
  "failedVoteCounter": 0,
  "resistance": [
    "HAROUN",
    "IBRAHIM",
    "1"
  ],
  "board": [
    2,
    3,
    2,
    3,
    3
  ],
  "currentPlayerIndex": 0,
  "turn": 0,
  "numPlayers": 5,
  "missions": [
    null,
    null,
    null,
    null,
    null
  ],
  "stateMachine": {
    "currentState": "showMissionResultsState",
    "revealState": {},
    "buildTeamState": {},
    "voteState": {},
    "showVoteResultsState": {},
    "conductMissionState": {},
    "showMissionResultsState": {
      "currentState": true,
      "mission": {
        "HAROUN": "S",
        "IBRAHIM": "S",
        "t2": "S",
        "t3": "S",
        "t4": "F"
      }
    },
    "gameOverState": {}
  }
}

export const MobileContext = React.createContext();

export const MobileProvider = ({
    children
}) => {
    const [sessionId, setSessionId] = useState('');
    const [gameState, setGameState] = useState(null);

    // THIS LINE IS FOR DEBUGGING PURPOSES
    // const [gameState, setGameState] = useState(testGameState);
    const [ws, setWebsocket] = useState(null);
    const [playerName, setPlayerName] = useState('');
    const [screen, setScreen] = useState(screens.home);

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
                setPlayerName,
                screen,
                setScreen
            }}
        >
            {children}
        </MobileContext.Provider>
    );
}