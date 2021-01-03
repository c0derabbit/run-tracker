# runtracker

a running app

## Requirements & development

Needs Node v12. If you don’t have it:

1. get `nvm`
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
````

2. install and switch to node v12
```
nvm install 12
nvm use 12
```

### To run locally:
```
yarn        # installs dependencies
yarn dev    # starts server
```

## Auth

This project uses [Magic](https://magic.link) with Next.js. It features cookie-based, passwordless authentication with email-based magic links.

The login cookie is `httpOnly`, meaning it can only be accessed by the API, and it's encrypted using [@hapi/iron](https://hapi.dev/family/iron) for more security.

### Configuration

Login to the [Magic Dashboard](https://dashboard.magic.link/) and get the keys of your application

Next, copy the `.env.local.example` file in this directory to .env.local (which will be ignored by Git):

```bash
cp .env.local.example .env.local
```

Then set each variable on `.env.local`:

- `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` should look like `pk_test_abc` or `pk_live_ABC`
- `MAGIC_SECRET_KEY` should look like `sk_test_ABC` or `sk_live_ABC`
- `TOKEN_SECRET` is a minimum 32 character-long string used to encrypt the session with Iron

## Deployment

This app works best on Vercel.

### Via Vercel UI

Create new project from GitHub repo, and fill the magic env vars when the UI asks you to. Push the button and you’re done.

### Via Vercel CLI
Install [Vercel CLI](https://vercel.com/download), log in to your account from the CLI, link your project (by running `vercel`) and run `vercel env add` to add the `NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY` and `MAGIC_SECRET_KEY` environment variables.
