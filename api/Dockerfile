FROM node:alpine3.14

WORKDIR /api

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

# Copy app file
COPY . ./
RUN npm build

CMD ["node", "dist/server.js"]
