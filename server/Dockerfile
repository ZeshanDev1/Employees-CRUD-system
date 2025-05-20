# server/Dockerfile

FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Backend runs on port 5000 by default
EXPOSE 5000

CMD ["node", "server.js"]
