FROM strapi/strapi:3.6.8-node14-alpine
ENV NODE_ENV production
WORKDIR /srv/app
COPY package*.json .
RUN yarn install

COPY . ./

RUN yarn build
EXPOSE 1337
CMD ["yarn", "start"]

