## Node.js Server for Scrapyard's connection to the database

Make sure to use ```npm``` when using this rather than ```yarn```. 


# to upload to docker
`docker buildx install`
`docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t steftodor/scrapyard-api:latest --push --all .`

```
docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t steftodor/scrapyard-api:latest .       
docker buildx build --platform linux/amd64 -t steftodor/scrapyard-api:latest-linux-amd64 --push .
docker buildx build --platform linux/arm64/v8 -t steftodor/scrapyard-api:latest-linux-arm64v8 --push .
docker buildx build --platform linux/arm/v7 -t steftodor/scrapyard-api:latest-linux-armv7 --push .```