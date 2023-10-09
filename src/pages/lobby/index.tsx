import GameContext from '@/contexts/game-context';
import styles from './Lobby.module.scss';
import React from 'react';
import NavbarLayout from '../navbar-layout';
import { User } from '@/interfaces/user.interface';
import { useHasMounted } from '@/utils/hooks';
import UserContext from '@/contexts/user-context';
import { Player } from '@/interfaces/game.interface';
import { useRouter } from 'next/router';


function Lobby() {
    const router = useRouter();
    const { activeGame, setActiveGame } = React.useContext(GameContext);
    const { activeUser, setActiveUser } = React.useContext(UserContext);

    function startGame(): void {

        if (activeGame) {
            // setGame Start to true
            // trigger countdown accross all browsers
            router.push(`/games/${activeGame.id}`);
        }

    };

    if(!activeGame){
        return(
            <NavbarLayout>
                <div className={styles['no-active-game']}>
                    <h1>
                        Go 
                        <a href="/games"> Here </a> 
                        to start a game 
                    </h1>
                </div>
            </NavbarLayout>
        )
    }

    return(
        <NavbarLayout>
            <div className={styles.wrapper}>
                <h1>{activeGame.name}</h1>
                
                <div className={styles.content}>
                    <h1 className="title-2"> Players in the game</h1>
                    <div className={styles.players}>
                        { activeGame ?
                            activeGame?.players?.map((player: Player) => (
                                <>
                                    <PlayerListItem player={player} activeUser={activeUser} key={player.id}/>
                                    <div className={styles.row} key={player.id}>
                                        {player.username}
                                        <span className="status-circle waiting">&nbsp;</span>
                                    </div>
                                    <div className={styles.row} key={player.id}>
                                        {player.username}
                                        <span className="status-circle waiting">&nbsp;</span>
                                    </div>
                                </>
                            ))
                            :
                            <div>
                                loading...
                            </div>
                        }
                    </div>
                </div>
                        
                <div className={styles['start-button-wrapper']}>
                    <button className={styles['start-button']} onClick={startGame}>
                        Tosaigh!
                    </button>
                </div>
            </div>
        </NavbarLayout>
    );
};

function PlayerListItem({player, activeUser}: {player: Player, activeUser: User}) {

    if(player.id == activeUser.id){
        return(
            <div className={styles.row} key={player.id}>
                {player.username}
                {
                    player.isReady ?
                    <span className="status-circle ready">&nbsp;</span>
                        :
                    <span className="ready-up-btn" title="Click to ready up">Ready Up</span>
                }
            </div>
        )
    } else if (player.isReady == false) {
        return(
            <div className={styles.row} key={player.id}>
                {player.username}
                <span className="status-circle waiting">&nbsp;</span>
            </div>
        )
    } else if (player.isReady == true) {
        return(
            <div className={styles.row} key={player.id}>
                {player.username}
                <span className="status-circle ready">&nbsp;</span>
            </div>
        );
    };
}

function Parent() {
    const hasMounted = useHasMounted();
    if (!hasMounted) {
      return null;
    }
    return <Lobby />
}
export default Parent;