FROM node:23.6.0-alpine
WORKDIR /frontend
COPY . /frontend
ENTRYPOINT ["/bin/sh", "-c", "npm install && npm run dev -- --host"]
