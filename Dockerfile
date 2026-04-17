# Using Node.js image
FROM node:18-alpine

#Setting working dir inside the container
WORKDIR /app

# Copying packge files inside the container
COPY package*.json ./

# Installing dependencies
RUN npm install

# Copying all files in the working dir
COPY . .

# Exposeing port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
