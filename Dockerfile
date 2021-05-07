FROM node:15-alpine as build-backend

RUN mkdir /app
WORKDIR /app
COPY frontend/deck-display/package.json ./
RUN cat package.json
RUN yarn install --production
COPY frontend/deck-display/. .
RUN yarn run build

FROM node:15-alpine

LABEL version="1.0"
LABEL description="Frontend for Deck-Display"
LABEL maintainer = ["nils@jn2p.de"]

RUN mkdir /app
WORKDIR /app
COPY backend/package.json ./
RUN cat package.json
RUN yarn install --production

COPY backend/ .

COPY --from=build-backend /app/build ./static

EXPOSE 5000
CMD ["node", "app.js"]





