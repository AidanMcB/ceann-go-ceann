import styles from './Home.module.scss';
import React from 'react';

function Home() {

    const [username, setUsername] = React.useState<string>('');
    const [errorMessage, setError] = React.useState<string>('');

    function submitUser(): void {
        if(username.length > 0){
            setError('');
            // submit logic
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