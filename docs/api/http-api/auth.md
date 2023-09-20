---
sidebar_position: 1
---

# Authorization

To make requests to the CloseVector API, you need to authenticate yourself. You can do this by providing an access key in the `Authorization` header of your request.

## Generate an access key

First you need to create an account on [closevector.getmegaportal.com](https://closevector.getmegaportal.com). Then you can generate an access key on the [Access key Management](https://closevector.getmegaportal.com/admin/keys).

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

