import React, { useState } from "react";

export const MobileContext = React.createContext();

export const MobileProvider = ({
    children
}) => {
    const [sessionId, setSessionId] = useState('');
    const [gameState, setGameState] = useState(null);
    const [ws, setWebsocket] = useState(null);

    return (
        <MobileContext.Provider
            value={{
                sessionId,
                gameState,
                setSessionId,
                setGameState,
                ws,
                setWebsocket
            }}
        >
            {children}
        </MobileContext.Provider>
    );
}