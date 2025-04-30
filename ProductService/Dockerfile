# Use the latest LTS version of Node.js
FROM node:18

# Set the working directory
WORKDIR /Microservices/ProductService

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

COPY .env ./


# Install system dependencies
RUN apt-get update && apt-get install -y \
    python3 \
    python3-pip \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies (including core packages)
RUN npm install --omit=dev

RUN npm install express-jwt

RUN npm install mongoose 


# Copy the application code
COPY . .

# Expose the application's port
EXPOSE 3002

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]
