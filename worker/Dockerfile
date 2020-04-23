FROM node:10
WORKDIR /opt/airquality/worker
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
CMD [ "yarn", "start" ]