FROM node:23.7.0
# Set the working directory in the container
WORKDIR /usr/src/api-server
COPY package.json .
RUN npm install
COPY . .
CMD npm start