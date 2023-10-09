import { _createUser, _getUsers } from '@/services/user.service';
import styles from './Home.module.scss';
import UserContext from '@/contexts/user-context';

// React / Nextjs
import React from 'react';
import { useRouter } from 'next/router'
import { setLocalStorage } from '@/utils/hooks';

function Home() {
    const router = useRouter();
    const { activeUser, setActiveUser } = React.useContext(UserContext);
    const [username, setUsername] = React.useState<string>('');
    const [errorMessage, setError] = React.useState<string>('');

    async function submitUser(): Promise<void> {
        setLocalStorage('loggedInUser', '');
        setError('');

        if(username.length > 0){
            const user = await _createUser(username);
            if(user && user !== undefined){
                setLocalStorage('loggedInUser', user);
                setActiveUser(user);
                router.push('/lobby');
            }else{
                setError('There was problem logging in');
            }
        }else{
            setError('Please enter a username')
        }
    }

    return(
        <div className={styles.wrapper}>
            <h1>Ceann-Go-Ceann</h1>
            <div className={styles.body}>
                <p className="title-1">Enter a one-time username:</p>
                    {errorMessage.length > 0 &&
                        <p className={styles.error}>
                            <i>*{errorMessage}</i>
                        </p>
                    }
                <div className={styles.form}>
                    <span>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" onChange={e => setUsername(e.target.value)}/>
                    </span>
                    <span>
                        <button type="submit" className="button form-button" onClick={submitUser}>
                            Submit
                        </button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Home;