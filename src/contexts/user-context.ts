import { User } from '@/interfaces/user.interface';
import React from 'react';

const UserContext = React.createContext(
    {
        activeUser: {} as User,
        setActiveUser: (user: User) => {}
    }
);

export default UserContext;