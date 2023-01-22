FROM node:lts
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY . .

EXPOSE 3002

CMD [ "node", "scripts/start-faucet.js" ]
