FROM strapi/base:14-alpine
ENV NODE_ENV production
WORKDIR /srv/app
COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]

