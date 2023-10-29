# Use Node.js 19 as the base image
FROM node:19

# Install PostgreSQL
RUN apt-get update && apt-get install -y postgresql postgresql-contrib

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app files into the working directory
COPY . .

# Expose port 9090 for the Express app
EXPOSE 9090

# Copy your seed script and a shell script to set up PostgreSQL and seed the database
COPY ./db/seeds/run-seed.js db/seeds/run-seed.js
COPY ./setup.sh /setup.sh

# Make the shell script executable and run it
RUN chmod +x /setup.sh
CMD ["/bin/bash", "/setup.sh"]

# Start the Express app
CMD [ "npm", "start" ]
