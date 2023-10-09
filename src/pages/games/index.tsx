// Services
import { _getAllGames, _getAllQuestions, _getQuestionsByCategory, _createGame } from '@/services/game.service';

// Components
import NavbarLayout from '../navbar-layout';

// Styles
import styles from './Games.module.scss';

// External
import React from 'react';
import { useRouter } from 'next/router';

// Tools and Utilities
import GameContext from '@/contexts/game-context';
import { getLocalStorage, removeLocalStorage, setLocalStorage, useHasMounted } from '@/utils/hooks';
import { Game } from '@/interfaces/game.interface';
import UserContext from '@/contexts/user-context';
import Link from 'next/link';

function Games(){

    const router = useRouter();
    const { activeGame, setActiveGame } = React.useContext(GameContext);
    const { activeUser, setActiveUser } = React.useContext(UserContext);

    const [ games, setGames ] = React.useState<Game[]>([] as Game[]);

    async function createGame() {
        const user = getLocalStorage('loggedInUser');
        if(user){
            const newGame = await _createGame(user, 'Eclipsis and Lenition');
            if(newGame){
                setActiveGame(newGame);
                removeLocalStorage('activeGame');
                setLocalStorage('activeGame', newGame);
                router.push(`/games/${newGame.id}`);
            }
        }
    }

    React.useEffect(() => {
        async function getGames(){
            const allGames = await _getAllGames();
            if (allGames) {
                setGames([...allGames])
            }
        };

        getGames();
    }, []);

    async function tryThis() {
        await _getQuestionsByCategory('Eclipsis and Lenition')
    }

    if (!activeUser) {
        return(
            <div className={styles['no-user']}>
                <h1>No user logged in</h1>
                <h2>Navigate back to the <a href="/home">Home Screen</a></h2>
            </div>
        )
    }

    return(
        <NavbarLayout>
            <div className={styles.wrapper}>
                <h1>Games</h1>
                
                <div className={styles.content}>
                    <div className={styles.host}>
                        <p className="title-1">Host a game</p>
                        <button className="button button--small" onClick={createGame}>Host</button>
                    </div>

                    <div className={styles.games}>
                        <p className="title-1">Join a game</p>
                        <div className={styles['games-grid']}>
                            { games && games.length > 0 ?
                                <GamesList games={games} activeUserId={activeUser.id} />
                                :
                                <i>No games available</i>
                            }
                        </div>
                    </div>

                </div>
            </div>
        </NavbarLayout>
    );
};

function GamesList({games, activeUserId}: {games: Game[], activeUserId: string}) {
    const gamesToJoin = games.filter(game => game.host_id !== activeUserId);

    if (gamesToJoin.length > 0) {
        return(
            <>
            {gamesToJoin.map(game => (
                <div key={game.id} className={styles.row}>
                    <span>{game.name}</span>
                    <button>Join</button>
                </div>
                ))}
            </>
        )
    } else {
        return <i>No games available</i>;
    }
}


function Parent() {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
      return null;
    }
    return <Games />
}

export default Parent;