## NodeJS / express / Typescript sandbox

### just do it

```
docker run --rm -p 8000:8000 educhaos/nodejs-server-sandbox
```

![just-do-it](https://github.com/evbruno/nodejs-server-sandbox/blob/just-do/it.png)

### local stuff

```
yarn install && yarn start
```

### docker stuff

```
docker build -t nodejs-server .
docker run --rm -p 8000:8000 nodejs-server
```

We can also tell the container to auto-restart, eg:

```
docker run --name my-service --restart=unless-stopped -p 8000:8000 nodejs-server
```

### test

```
curl http://localhost:8000/
```
