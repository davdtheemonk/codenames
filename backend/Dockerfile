FROM debian:bookworm-slim AS build

# Set the working directory
WORKDIR /backend

# Install Node.js and npm
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Install global dependencies like TypeScript and ts-node
RUN npm install -g typescript 

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

RUN npm config set legacy-peer-deps true
# Install all dependencies (both dev and prod)
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the TypeScript code (output to the dist folder)
RUN npm run build

# ---------- Production Stage ----------
# Use a lightweight image for running the production code
FROM debian:bookworm-slim AS production

# Set the working directory in the production container
WORKDIR /backend

RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
    
# Copy only the necessary files from the build stage (dist folder and node_modules)
COPY --from=build /backend/package.json /backend/package-lock.json ./
COPY --from=build /backend/node_modules ./node_modules 
COPY --from=build /backend/dist ./dist 

# Expose the port that the app will run on (example: 4040)
EXPOSE 3001

# Command to run the application (point to the entry file in dist)
CMD ["node", "dist/src/index.js"]
