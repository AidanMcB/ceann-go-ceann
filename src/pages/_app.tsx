import '../styles/globals.css';
import '../styles/index.scss';
import { AppProps } from 'next/app';

// Fonts


export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />    
}    