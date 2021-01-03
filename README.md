##

tl;dr
1. copy this repo
2. add emails of people you’d like to access this to `config.js`
3. add your own will into `vegrendelet.md`
4. add your own name (and anything you want) into `signature.md`
5. configure Magic (see Auth > Configuration in this Readme)
6. create a new Vercel project, set the Magic env vars, and deploy

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

__Users are manually white-listed.__ Go to `config.js` to define the list of allowed emails. Magic has no way to disable new sign ups, so we’ll control this way instead. Emails are checked against the whitelist both on the frontend (after submission), and on the backend (before setting the cookie).

### Configuration

Login to the [Magic Dashboard](https://dashboard.magic.link/) and get the keys of your application

![Magic Dashboard](https://gblobscdn.gitbook.com/assets%2F-M1XNjqusnKyXZc7t7qQ%2F-M3HsSftOAghkNs-ttU3%2F-M3HsllfdwdDmeFXBK3U%2Fdashboard-pk.png?alt=media&token=4d6e7543-ae20-4355-951c-c6421b8f1b5f)

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

## Final notes

Make sure your family and close friends can access the app – they will have to one day. Revise your will and the access list once in a while.
