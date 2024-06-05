# stage 1: we want to produce the react build:
# Use an official Node runtime as a parent image
FROM node:15-alpine AS builder

# go to /app
# Set the working directory to /app
WORKDIR /app

# copy package.json from our source to /app
# Copy the package.json to the container
COPY package.json ./

# npm install
# Install dependencies
RUN npm i

# now copy the source code
# Copy the rest of the application code to the container
COPY ./ ./

# now we can ask react to build our code to production
# the result will be in the /app/build directory
# Build the React app
RUN npm run build

# Now we start over with a fresh nginx machine
# nginx is 2nd most popular web server after apache
# it is not neccessarily CGI
# Use an official Nginx runtime as a parent image
FROM nginx:alpine

# we go to this directory
WORKDIR /usr/share/nginx/html

# and we empty it totally
RUN rm -rf *

# now we copy the react build products from the 1st stage, to here
# Copy the React app build files to the container
COPY --from=builder /app/build .
# COPY nginx.conf ../sites-available/

# Copy the ngnix.conf to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for Nginx
# EXPOSE 80

# and now we can start nginx, which will serve our react app to any browser
# that access this server
# Start Nginx when the container starts
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]
# CMD nginx -g daemon off;
# CMD ["nginx", "-g", "daemon off;"]