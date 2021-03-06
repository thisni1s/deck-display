# Deck Display

This app aims to provide a **temporary** solution for this issue: [Public board sharing](https://github.com/nextcloud/deck/issues/14) in the Nextcloud Deck application.

## How does it work?

You need to create an extra nextcloud user, with whom you share the boards you want to show on the page. The app uses the Deck Api to get all Boards shared with that user and displays them.

## Deployment

Build the Docker image with: ```docker build -t deck-display:latest .```

Example for a docker-compose file:
```
version: "3.7"
services:
  deck-display:
    image: deck-display:latest
    ports:
      - "127.0.0.1:5000:5000"
    environment:
      USERNAME: deck-user
      PASSWORD: yourverysecurepassword
      BASEURL: https://nextcloud.example.tld  
    restart: unless-stopped

```

**Necessary** environment variables:

- USERNAME <- The nextcloud username, please create an extra user for this.
- PASSWORD <- The password for the nextcloud user.
- BASEURL <- the url of your nextcloud instance without a '/' ath the end!

**Note:** I had no idea what i was doing, please implement the original nextcloud issue. :)
