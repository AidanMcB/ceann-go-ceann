import { Game } from '@/interfaces/game.interface';
import React from 'react';

const GameContext = React.createContext(
    {
        activeGame: {} as Game,
        setActiveGame: (game: Game) => {}
    }
);

export default GameContext;