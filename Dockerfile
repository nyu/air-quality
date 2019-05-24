FROM node:10
WORKDIR /opt/airquality
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN wget https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh
RUN yarn build

EXPOSE 3000
CMD [ "bash", "wait-for-it.sh", "mongo:27017", "--", "node", "server.js" ]