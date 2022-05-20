FROM node:alpine3.14

WORKDIR /api

# add app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install 

# RUN touch .env
RUN echo $First_Name
# ADD $First_Name /api/.env
# RUN ls
COPY .env ./api/
# Copy app file
COPY . ./
RUN npm run build

CMD ["node", "dist/server.js"]
