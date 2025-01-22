# Step 1: Build the application
FROM node:22

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json to install dependencies
COPY package.json ./

# Install dependencies based on the NODE_ENV environment variable
ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

ENV PORT 3000
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
