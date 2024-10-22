# Use an official Node.js image
FROM node:16-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port that the development server runs on
EXPOSE 3000

# Set environment variable to development mode (if needed)
ENV NODE_ENV=development

# Run the development server
CMD ["npm", "start"]
