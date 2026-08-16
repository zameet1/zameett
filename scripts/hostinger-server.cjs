const { createServer } = require("node:http");
try {
  require("./runtime-env.cjs");
} catch (error) {
  if (error?.code !== "MODULE_NOT_FOUND") throw error;
}

const { loadEnvConfig } = require("@next/env");

loadEnvConfig(__dirname);

const next = require("next");
const { config } = require("./.next/required-server-files.json");

process.env.NODE_ENV = "production";

const app = next({
  dev: false,
  dir: __dirname,
  conf: config,
});
const handle = app.getRequestHandler();
const listenTarget = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    createServer((request, response) => {
      handle(request, response);
    }).listen(listenTarget, () => {
      console.log("Zameett Passenger runtime ready");
    });
  })
  .catch((error) => {
    console.error("Zameett Passenger runtime failed", error);
    process.exit(1);
  });
