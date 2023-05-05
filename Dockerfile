FROM node:alpine AS builder

# Create app directory
WORKDIR /usr/src/app

COPY package.json yarn.lock ./
COPY prisma ./prisma/

# Install app dependencies
RUN yarn install

COPY . .

RUN yarn build

# RUN npx prisma migrate deploy

# FROM node:14

# COPY --from=builder /usr/src/app/node_modules ./node_modules
# COPY --from=builder /usr/src/app/package*.json ./
# COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 3000
CMD [ "yarn", "start:prod" ]
