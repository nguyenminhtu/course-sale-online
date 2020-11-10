FROM node:14

RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/frontend

WORKDIR /usr/src/app/frontend

COPY package.json ./
COPY yarn.lock ./

RUN yarn

COPY . .

RUN yarn global add serve

RUN yarn build


EXPOSE 3000

CMD ["serve", "-l", "3000", "-s", "build"]