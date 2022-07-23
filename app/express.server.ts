import path from 'node:path';
import express from 'express';
import payload from 'payload';
import morgan from 'morgan';

import { createRequestHandler } from "@remix-run/express";

// populate env variables from .env
require('dotenv').config();

const BUILD_DIR = path.join(process.cwd(), "build");
const PORT = process.env.PORT || 3000;

const App = express();

// Initialize Payload
payload.init({
  secret: process.env.PAYLOAD_SECRET || '',
  mongoURL: process.env.MONGODB_URL || '',
  express: App,
  onInit: () => {
    payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
  },
})

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
App.disable("x-powered-by");

// Remix fingerprints its assets so we can cache forever.
App.use(
  "/build",
  express.static("public/build", { immutable: true, maxAge: "1y" })
);

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
App.use(express.static("public", { maxAge: "1h" }));

// Move this line above the payload.init
// line to log admin routes.
App.use(morgan("tiny"));

App.all(
  "*",
  process.env.NODE_ENV === "development"
    ? (req, res, next) => {
        purgeRequireCache();

        return createRequestHandler({
          build: require(BUILD_DIR),
          mode: process.env.NODE_ENV,
          getLoadContext(req, res) {
            return {
              // @ts-ignore
              payload: req.payload
            };
          },
        })(req, res, next);
      }
    : createRequestHandler({
        build: require(BUILD_DIR),
        mode: process.env.NODE_ENV,
        getLoadContext(req, res) {
          return {
            // @ts-ignore
            payload: req.payload
          };
        },
      })
);

App.listen(PORT, () => {
  payload.logger.info(`Remix URL ${payload.config.serverURL}`)
});

function purgeRequireCache() {
  // purge require cache on requests for "server side HMR" this won't let
  // you have in-memory objects between requests in development,
  // alternatively you can set up nodemon/pm2-dev to restart the server on
  // file changes, but then you'll have to reconnect to databases/etc on each
  // change. We prefer the DX of this, so we've included it for you by default
  for (let key in require.cache) {
    if (key.startsWith(BUILD_DIR)) {
      delete require.cache[key];
    }
  }
}
