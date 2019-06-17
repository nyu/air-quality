FROM node:10
WORKDIR /opt/airquality
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "node", "server.js" ]