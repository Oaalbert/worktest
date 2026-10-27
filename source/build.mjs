import {readFile,writeFile,mkdir} from 'node:fs/promises';
const root=new URL('../',import.meta.url),html=await readFile(new URL('./index.html',import.meta.url),'utf8');
const admin='https://hourledger-1027.mytming66888.chatgpt.site/manage';
await mkdir(new URL('v2/',root),{recursive:true});
await writeFile(new URL('v2/index.html',root),html);
await writeFile(new URL('.nojekyll',root),'');
await writeFile(new URL('index.html',root),'<!doctype html><html lang="zh-Hant"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>工時V2.0｜管理入口</title><meta http-equiv="refresh" content="0;url='+admin+'"><link rel="canonical" href="'+admin+'"></head><body><p>此網址為管理入口。<a href="'+admin+'">前往管理後台</a></p></body></html>');
console.log('Built admin redirect and v2/index.html');
