FROM node:20-alpine

# Build arguments and Environment variables
ARG BACKEND
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
ENV BACKEND_URL=$BACKEND

# Create app directory
WORKDIR /var/www

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .
RUN npm run build

# Expose NodeJS server port
EXPOSE $PORT

# Set the default command to run when starting the container
CMD ["npm", "start"]
