# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Install git
RUN apk add --no-cache git

# Set the working directory
WORKDIR /app

# Clone the GitLab repository using the token
RUN git clone --branch main https://github.com/willem0boone/Edito_model_viewer /app

# Navigate to the application directory
WORKDIR /app/model_viewer/habitat_suitability

# Install dependencies
RUN npm install

# Expose the port your app runs on
EXPOSE 5002

# Define the command to run your app
CMD ["npm", "run", "dev"]
