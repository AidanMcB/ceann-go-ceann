import { useRouter } from 'next/router'
import styles from './Games.module.scss';
import React from 'react';
import GameContext from '@/contexts/game-context';
import Link from 'next/link';
import { useHasMounted } from '@/utils/hooks';
import UserContext from '@/contexts/user-context';
import { _listenForGameStart, _startGame } from '@/services/game.service';

function Game() {
    const router = useRouter()
    const gameId = router.query.slug;

    const { activeGame } = React.useContext(GameContext);
    const { activeUser } = React.useContext(UserContext);

    async function startGame() {
        // start game in db to trigger 10 second countdown
        // Do whatever
        await _startGame(activeGame.id);
    };

    React.useEffect(() => {
        startListeningForGameStart();
    }, []);

    async function startListeningForGameStart(){
        await _listenForGameStart(activeGame.id);
    };

    if (activeGame.id != gameId || !activeGame) {
        return(
            <div>
                <h1>No game found with id {gameId}</h1>
                <h2>Go back to the<Link href="/games">Games</Link> page</h2>
            </div>
        )
    };
    return (
        <div className={styles['game-wrapper']}>
            <h1>{activeGame.name}</h1>
            {activeGame.host_id == activeUser.id ? 
                <div>
                    <button onClick={startGame}>Start the Game</button>
                </div>
            :
                <p>Waiting for the host to start the game...</p>
            }
        </div>
    )
};

function Parent() {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
      return null;
    }
    return <Game />
}
export default Parent;