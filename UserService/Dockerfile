# Use the latest LTS version of Node.js with a minimal base image
FROM node:20-slim

# Set the working directory
WORKDIR /Microservices/UserService

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

COPY .env ./

# Update and install necessary system dependencies securely
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ensure package-lock.json is updated before installation
RUN npm install --only=production

RUN npm install express-jwt

RUN npm install mongoose 

# Copy the application code
COPY . .

# Ensure the container runs with a non-root user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Expose the application's port
EXPOSE 3001

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]
