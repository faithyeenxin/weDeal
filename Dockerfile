FROM node:14

WORKDIR /apps

RUN npm install -g typescript

COPY package*.json ./
RUN npm install

COPY /apps/client/package*.json ./apps/client/
RUN cd ./apps/client && npm install

COPY /apps/server/package*.json ./apps/server/
RUN cd ./apps/server && npm install

COPY . .
RUN npm install turbo 
RUN npm run build
RUN npm run generate

ENV PORT=3500
EXPOSE 3500

CMD ["npm", "run", "start"]

