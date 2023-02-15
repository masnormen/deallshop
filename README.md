# DeallShop

**DeallShop** is a simple e-commerce admin showcase app

## :package: Installation

Clone this repository into your local machine, then:

NPM:

```sh
$ npm install
#or
$ yarn install
```

(Important!) Copy the .env file

```sh
$ cp .env.example .env
```

You might need to reload your shell/terminal. And run it:

```sh
$ npm run dev
#or
$ yarn dev
```

You can also build the image with docker:

```sh
$ docker build -t deallshop:dev .
```

And run it

```sh
$ docker run \
    -it \
    --rm \
    -v ${PWD}:/app \
    -v /app/node_modules \
    -p 3001:3000 \
    -e CHOKIDAR_USEPOLLING=true \
    deallshop:dev
```
