# an auto reply chatbot based on wechaty

## REQUIREMENTS

1. Node.js v10 or above
2. Build Tools for your Platform

## GETTING STARTED

### 0. Install Node.js (>=10)

If you have not installed Node.js(or version is below 10),You need to install the latest version of Node.js first by following the links below:

* [Windows](https://nodejs.org/en/download/package-manager/#windows)
* [Linux(Debian/Ubuntu)](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions)
* [macOS](https://nodejs.org/en/download/package-manager/#macos)

> Instal Node.js for other platforms can be found at <https://nodejs.org/en/download/package-manager/>

### 1. Clone this Repository

### 2. Install Dependencies

```sh
npm install
```

### 3. Run the Bot

```sh
npm start
```

Or use node to run bot directly

```shell
# Linux: export WECHATY_LOG=verbose
# Win32: set WECHATY_LOG=verbose
node examples/ding-dong-bot.js
```

## ADVANCED

### 1. TypeScript

```sh
npm run start:ts
```

This will run `examples/ding-dong-bot.ts` instead of `examples/ding-dong-bot.js` for you.

## API REFERENCE

1. JSDoc: <https://chatie.io/wechaty/>
