FROM node

COPY . /app
WORKDIR /app
CMD yarn start
