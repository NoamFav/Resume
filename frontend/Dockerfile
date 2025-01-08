FROM node:18-bullseye-slim

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies with `npm ci` for a clean and consistent install
RUN npm ci

# Copy the rest of the application files
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev"]
