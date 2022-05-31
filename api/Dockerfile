FROM node:alpine3.14

WORKDIR /api

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

COPY /.env ./api/
# Copy app file
COPY . ./
RUN ls -la
RUN cat .env
RUN npm run build

CMD ["node", "dist/server.js"]
