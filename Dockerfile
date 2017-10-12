FROM node:latest
EXPOSE 5555
WORKDIR /var/www/getnativelearning.com
CMD \
  npm install && \
  npm start
