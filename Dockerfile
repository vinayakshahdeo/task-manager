FROM node:20-bullseye

WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install all deps (including dev) so tsc is available
RUN npm install

# Copy the rest of the app
COPY . .

# Build TypeScript -> dist
RUN npm run build

# Set env and port
ENV NODE_ENV=production
ENV PORT=3000

EXPOSE 3000

# Start compiled app
CMD ["npm", "start"]
