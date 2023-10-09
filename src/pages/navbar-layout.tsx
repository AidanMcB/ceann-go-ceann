import React from 'react';
import styles from './Navbar.module.scss';
import { User } from '@/interfaces/user.interface';
import UserContext from '@/contexts/user-context';
import { set } from 'firebase/database';
import Link from 'next/link';
import { getLocalStorage } from '@/utils/hooks';

function Navbar(){

    const [user, setUser] = React.useState<User>();

    React.useEffect(() => {
        console.log('Layout Ran');
        if (typeof window !== "undefined") {
            const myUser = getLocalStorage('loggedInUser');
            if(myUser){
                setUser(myUser);
            }
        }
    }, []);

    
    return(
        <div className={styles.navbar}>
            <Link className={styles.home} href="/home">
                Home
            </Link>
            {user && user.username && 
                <span className={styles.user}>{user.username}</span>
            }
        </div>
    );
};

export default function NavbarLayout(
    {children}: {children: React.ReactNode}){
        return(
            <>
                <Navbar />
                {children}
            </>
        )
}