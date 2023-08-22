FROM node:20-alpine

# Build arguments and Environment variables
ARG PG_USER
ARG PG_PASS
ARG PG_HOST
ENV PORT=3001
ENV HOST=0.0.0.0
ENV DATABASE_URL="postgres://${PG_USER}:${PG_PASS}@${PG_HOST}:5432/todo?schema=public"

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package*.json ./
RUN yarn install

# Bundle app source
COPY . .

# Expose NodeJS server port
EXPOSE $PORT

# Set the default command to run when starting the container
ENTRYPOINT ["/bin/sh", "-c", "yarn run db:gen && yarn run db:deploy && yarn run start:prod"]
