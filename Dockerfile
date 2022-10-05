FROM node:18.10.0-bullseye
WORKDIR /my-app
COPY package*.json .
RUN npm install --save firebase
COPY . .
RUN npm update
ENV API_URL = http://myapp.com/
EXPOSE 3000
CMD ["npm", "start"]

