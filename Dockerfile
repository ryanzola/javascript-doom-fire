# Specify the base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]
