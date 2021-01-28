FROM node:14-buster

RUN mkdir /app
WORKDIR /app

RUN apt-get update && \
    apt-get upgrade && \
	apt-get install -y git && \
	apt-get install -y neovim

COPY package.json package.json
COPY client/package.json client/package.json
RUN npm install --silent 
RUN cd client/ && npm install --silent

COPY . .

LABEL maintainer="ichirou2910"

CMD ./scripts/start.sh
