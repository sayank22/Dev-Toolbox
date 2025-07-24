FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the server files
COPY . .

# Expose the server port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
