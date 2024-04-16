FROM ubuntu
RUN apt-get update && \
    apt-get install -y curl && \
    curl -sL https://deb.nodesource.com/setup_18.x -o nodesource_setup.sh && \
    bash nodesource_setup.sh && \
    apt-get install -y nodejs && \
    npm install -g nodemon
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
COPY .env ./
EXPOSE 3000
CMD ["nodemon", "app.js"]
