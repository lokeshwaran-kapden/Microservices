# Use the latest LTS version of Node.js with a minimal base image
FROM node:20-slim

# Set the working directory
WORKDIR /Microservices/APIGateway

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package.json package-lock.json ./

# Update and install necessary system dependencies securely
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Ensure package-lock.json is updated before installation
RUN npm install --only=production

RUN npm install cors

RUN npm install morgan

RUN npm install redis


# Copy the application code
COPY . .

# Ensure the container runs with a non-root user for security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Expose the application's port (API Gateway usually runs on 8000)
EXPOSE 8000

# Set environment variables
ENV NODE_ENV=production

# Start the application
CMD ["node", "index.js"]
