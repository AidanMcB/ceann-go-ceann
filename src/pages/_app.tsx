import { Game } from '@/interfaces/game.interface';
import '../styles/globals.css';
import '../styles/index.scss';
import { AppProps } from 'next/app';
import React from 'react';
import GameContext from '@/contexts/game-context';
import { User } from '@/interfaces/user.interface';
import UserContext from '@/contexts/user-context';
import { getLocalStorage } from '@/utils/hooks';

// Fonts

export default function App({ Component, pageProps }: AppProps) {
    
    const [activeGame, setActiveGame] = React.useState<Game>(() => checkForGame());
    const gameVal = { activeGame, setActiveGame };

    const [activeUser, setActiveUser] = React.useState<User>(() => checkForUser());
    const userVal = { activeUser, setActiveUser };

    function checkForGame() {
        if (typeof window !== "undefined") {
            const storedGame = getLocalStorage('activeGame');
            if(storedGame){
                return storedGame;
            }
        }
    };

    function checkForUser() {
        if (typeof window !== "undefined") {
            const storedUser = getLocalStorage('loggedInUser');
            if(storedUser){
                return storedUser;
            }
        }
    };


    return (
        <UserContext.Provider value={userVal}>
            <GameContext.Provider value={gameVal}>
                <Component {...pageProps} />
            </GameContext.Provider>
        </UserContext.Provider>
    );    
}    