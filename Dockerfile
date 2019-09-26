# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
# FROM node:8-alpine also works here for a smaller image
FROM node:10.16.3-alpine

# default to port 3000 for node, and 9229 and 9230 (tests) for debug
ARG PORT=3000
ENV PORT $PORT
EXPOSE $PORT 5858

# install dependencies first, in a different location for easier app bind mounting for local development
# due to default  permissions we have to create the dir with root and change perms
RUN mkdir /node_app && chown node:node /node_app
WORKDIR /node_app
# the official node image provides an unprivileged user as a security best practice
# but we have to manually enable it. We put it here so npm installs dependencies as the same
# user who runs the app. 
# https://github.com/nodejs/docker-node/blob/master/docs/BestPractices.md#non-root-user
USER node
COPY package.json yarn.lock ./
RUN yarn install
ENV PATH /node_app/node_modules/.bin:$PATH

# copy in our source code last, as it changes the most
WORKDIR /node_app
COPY ./.next ./.next
COPY ./pages ./pages

CMD [ "yarn", "start" ]