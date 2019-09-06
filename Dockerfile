FROM node:11.13.0-alpine

# ENV NUXT_HOST=0.0.0.0
ENV PORT=80
# ENV MONGO_URL="mongodb://sitedrootuser:sitedrootuser@docdb-2019-09-04-02-00-24.cluster-cqe1vtwjwp7z.ap-southeast-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0"
# ENV MONGO_DB="staging"

# RUN apk add python make g++

# create destination directory
RUN mkdir -p /usr/src/express-api
WORKDIR /usr/src/express-api

# update and install dependency
# RUN apk update && apk upgrade
# RUN apk add git

# copy the api, note .dockerignore
COPY ./dist /usr/src/express-api/
COPY rds-combined-ca-bundle.pem /usr/src/express-api/
RUN chmod +x ./entrypoint.sh
RUN npm install

EXPOSE 80

# start the app
ENTRYPOINT ["sh", "-c", "./entrypoint.sh"]
