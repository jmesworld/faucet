FROM node:lts
ENV NODE_ENV=production

WORKDIR /app
RUN rm -rf /app
COPY ["package.json", "./"]
RUN npm config set package-lock false
RUN npm install --production
RUN npm install git+https://github.com/mayoreee/jmes.js.git
COPY . .

EXPOSE 8080

CMD [ "node", "scripts/start-faucet.js" ]
