---
sidebar_position: 2
---

# Tutorial

The tutorial offers a step-by-step guide on using `closevector-node` for text embeddings and vector storage. It covers installation via npm, access key generation for authentication, and code samples in TypeScript for importing classes, token encryption, and data preparation. The tutorial helps you fetch Hacker News stories, convert them to a specific format, and initialize a vector store, culminating in index creation.

## Installing closevector-node

```bash
npm install closevector-node
```

## Generate your first access key

First you need to create an account on [closevector.getmegaportal.com](https://closevector.getmegaportal.com). Then you can generate an access key on the [Access key Management](https://closevector.getmegaportal.com/admin/keys).

## Importing packages

```typescript
import {
    CloseVectorEmbeddings,
    HNSWLib,
    upsertIndex
} from 'closevector-node';
import { Document } from 'langchain/document';
```

## Authenticate your requests

```typescript
import jwt from '@tsndr/cloudflare-worker-jwt'; // you can also use any other JWT library, for example: jsonwebtoken

export async function encryptToken(object: Record<string, any>, secret: string): Promise<string> {
    const token = await jwt.sign({
        // 1 hour from now on
        ...object,
        iat: Date.now(),
        exp: Math.floor((Date.now() + 60 * 60 * 1000) / 1000),
    }, secret);
    return token;
}

export const fetchUsingToken = async function fetchUsingToken(url: string, options: RequestInit) {
    const accessKey = 'your access key';
    const secret = 'your secret';

    let res = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            Authorization: `Bearer ${accessKey}:${await encryptToken({ accessKey }, secret)}`,
        },
    });

    if (res.status !== 200) {
        let json = await res.json();
        throw new Error(await (json as any).message);
    }

    return res;
};
```

## Preparing your data and creating index

```typescript
// get list from recent hot hacker news posts: https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty

function concurrentPromise<T>(promises: (() => Promise<T>)[], limit: number): Promise<T[]> {
    return new Promise((resolve, reject) => {
        let results: T[] = [];
        let index = 0;
        let running = 0;
        let done = 0;

        function run() {
            if (done === promises.length) {
                resolve(results);
                return;
            }

            while (running < limit && index < promises.length) {
                running++;
                
                function handler(index: number) {
                    return function (result: T) {
                        results[index] = result;
                        running--;
                        done++;
                        run();
                    }
                }

                promises[index]().then(handler(index)).catch((err) => {
                    reject(err);
                });
                index++;
            }
        }

        run();
    });
}

(async () => {

    const hackerNewsTopStories = (await (await fetch('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')).json());

    console.log("getting posts");
    const posts = await concurrentPromise(hackerNewsTopStories.map((id: number) => async () => {
        return await (await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)).json();
    }), 5);

    console.log("getting posts done");

    let documents: Document[] = posts.map((p: any) => {
        return {
            pageContent: `title: ${p.title}` + "\n" + `text: ${p.text}` + "\n" + `score: ${p.score}`,
            metadata: {
                url: p.url,
            }
        }
    })

    const vectorStore = await HNSWLib.fromDocuments(
        documents,
        new CloseVectorEmbeddings({
            key: accessKey,
            secret: secret,
        })
    );

    await upsertIndex(vectorStore, {
        description: '',
        accessKey,
        secret,
        onProgress: (e) => {
            console.log(e)
        }
    });

})();
```