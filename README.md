# Website

This website is built using [Docusaurus 2](https://docusaurus.io/), you can visit the website at [closevector-docs](https://closevector-docs.getmegaportal.com/).

### Generate your first access key

First you need to create an account on [closevector.getmegaportal.com](https://closevector.getmegaportal.com). Then you can generate an access key on the [Access key Management](https://closevector.getmegaportal.com/admin/keys).

### Updating the key and secret

update `.env.local` file with your key and secret

### Installation

```
$ yarn
```

### Injecting the docs

```
npx ts-node scripts/inject.ts
```

### Local Development

```
$ yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.