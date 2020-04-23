FROM node:10
WORKDIR /Users/caspar/dev/temp200423/air-quality/worker
ENV NODE_ENV production

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . .
CMD [ "yarn", "start" ]