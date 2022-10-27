FROM node:16.18.0-alpine

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 3000/tcp

CMD ["npm", "start", "-o"]