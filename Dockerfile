FROM node:14-alpine as build
ADD . /appBuild
WORKDIR /appBuild
RUN yarn install --ignore-scripts && \
    yarn build

FROM node:14-alpine
WORKDIR /app
COPY --from=build /appBuild .
ENTRYPOINT [ "yarn", "start:prod" ]
