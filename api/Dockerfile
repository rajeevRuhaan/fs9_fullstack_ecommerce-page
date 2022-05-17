FROM node:alpine

WORKDIR /api

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

# Copy app file
COPY . .

CMD ["node", "dist/server.js"]
