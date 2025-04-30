# Use the latest LTS version of Node.js
FROM node:20-slim 

# Set the working directory
WORKDIR /Microservices/OrderService

# Copy only the necessary files to avoid caching issues
COPY package.json package-lock.json ./

COPY .env ./


RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

    # Install dependencies
RUN npm install --omit=dev

RUN npm install express-jwt

RUN npm install mongoose 

# Copy the rest of the application code
COPY . .

RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser


# Expose the application port (if needed, change to your app's port)
EXPOSE 3003

# Set environment variables
ENV NODE_ENV=production

# Set the command to run your application
CMD ["node", "index.js"]
