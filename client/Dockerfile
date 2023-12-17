FROM node:latest

WORKDIR /client

COPY package*.json ./
RUN npm install
COPY .env.local ./
COPY . .

RUN npm run build
EXPOSE 3000

CMD ["npm", "run", "serve"]