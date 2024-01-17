# Use the official Node.js 14 image as the base image
FROM node:20-slim

# Set the working directory inside the container
WORKDIR /code

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the project files to the working directory
COPY . .

# Expose the port that the application will run on
EXPOSE 9000

# Start the application
CMD ["npm", "start"]
