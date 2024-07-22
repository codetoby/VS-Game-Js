FROM node:latest

WORKDIR /app

COPY package.json ./

COPY ./ ./

ADD https://raw.githubusercontent.com/vishnubob/wait-for-it/master/wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

RUN npm install

EXPOSE 8080

CMD ["/wait-for-it.sh", "mariadb:3306", "--", "npm", "start"]

