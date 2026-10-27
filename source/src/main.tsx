import React from 'react';
import {createRoot} from 'react-dom/client';
import LedgerApp from './ledger-app';
import './styles.css';
const backend='https://hourledger-1027.mytming66888.chatgpt.site';
const home=new URL('./',window.location.href).pathname;
const demo=new URLSearchParams(window.location.search).get('demo')==='1';
createRoot(document.getElementById('root')!).render(<React.StrictMode><LedgerApp demo={demo} apiOrigin={backend} links={{home,demo:home+'?demo=1',manage:backend+'/manage'}}/></React.StrictMode>);
