FROM node:16-alpine3.11
COPY dist ./
RUN npm install express
EXPOSE 80
ENTRYPOINT ["node","server.js"]
