## Node.js Server for Scrapyard's connection to the database

Make sure to use ```npm``` when using this rather than ```yarn```. 


# to upload to docker
`docker buildx install`
`docker buildx build --platform linux/amd64,linux/arm64/v8,linux/arm/v7 -t steftodor/scrapyard-api:latest --push --all .`

