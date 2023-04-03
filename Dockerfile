# Pull the latest Node.js Docker Image
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# copy the package.json files from local machine to the workdir in container
COPY package*.json ./

# Install dependencies
RUN npm install -f
RUN npm i -g rimraf

# Copy the project files into the working directory (container)
COPY ./ ./

# Build the project
RUN npm run build

# Expose the listening port
EXPOSE 5000

CMD ["node", "dist/main"]