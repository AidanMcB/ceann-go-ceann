import React from 'react';

export function useHasMounted(): boolean {
    const [ hasMounted, setHasMounted ] = React.useState(false);
    React.useEffect( () => {
        setHasMounted(true);
    }, []);
    return hasMounted;
};

// *** Local Storage *** //
export function setLocalStorage(key: string, value: any): void {
    // const stringVal = JSON.stringify(value);
    // localStorage.setItem(key, stringVal);
    const stringVal = JSON.stringify(value);
    sessionStorage.setItem(key, stringVal);
};

export function getLocalStorage(key: string): any {
    // const stored = localStorage.getItem(key);
    // if(stored) {
    //     return JSON.parse(stored);
    // }else{
    //     return null
    // }
    const stored = sessionStorage.getItem(key);
    if(stored) {
        return JSON.parse(stored);
    }else{
        return null;
    }
};

export function removeLocalStorage(key: string): void {
    // localStorage.removeItem(key);
    sessionStorage.removeItem(key);

};

// *** Session Storage *** //
export function setSessionStorage(key: string, value: any): void {
    const stringVal = JSON.stringify(value);
    sessionStorage.setItem(key, stringVal);
};

export function getSessionStorage(key: string): any {
    const stored = sessionStorage.getItem(key);
    if(stored) {
        return JSON.parse(stored);
    }else{
        return null;
    }
};

export function removeSessionStorage(key: string): void {
    sessionStorage.removeItem(key);
};
