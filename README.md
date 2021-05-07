# Deck Display

This app aims to provide a **temporary** solution for this issue: [Public board sharing](https://github.com/nextcloud/deck/issues/14) in the Nextcloud Deck application.

Build the image with: ```docker build -t deck-display:latest .````

**Necessary** environment variables:

- USERNAME <- the nextcloud username, please create an extra user for this
- PASSWORD <- the password for the nextcloud user.
- BASEURL <- the url of your nextcloud instance

**Note:** I had no idea what i was doing, please implement the original nextcloud issue :)
