# Use Node.js 19 as the base image
FROM node:19

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

# Start the Express app
CMD [ "npm", "start" ]
