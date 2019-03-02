FROM node

RUN mkdir /home/node/app

WORKDIR /home/node/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . . 

CMD yarn start

