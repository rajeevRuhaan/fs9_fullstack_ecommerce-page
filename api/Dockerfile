FROM node:alpine3.14

WORKDIR /api

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

RUN pwd
RUN ls -la
COPY /.env ./api/
# Copy app file
COPY . ./
RUN npm run build

CMD ["node", "dist/server.js"]
