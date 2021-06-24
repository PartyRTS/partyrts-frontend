FROM node:16-alpine3.11
RUN pwd
COPY . /
RUN ls
RUN npm install
RUN npm run heroku-postbuild
EXPOSE 80
ENTRYPOINT ["npm","run","start"]
