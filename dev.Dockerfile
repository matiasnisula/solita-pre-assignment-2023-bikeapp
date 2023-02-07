FROM node:16

WORKDIR /usr/src/backend

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]