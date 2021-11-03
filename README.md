## NodeJS / express / Typescript sandbox

### local stuff

```
yarn install && yarn start
```

### docker stuff

```
docker build -t nodejs-server .
docker run --rm -p 8000:8000 nodejs-server
```


### test

```
curl http://localhost:8000/
```