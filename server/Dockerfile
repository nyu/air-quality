FROM node:10
WORKDIR /Users/caspar/dev/temp200423/air-quality/server
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]