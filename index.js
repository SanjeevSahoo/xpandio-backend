require("dotenv").config();

const webServer = require("./services/webserver.js");

async function startup() {
  console.log("Starting application");

  try {
    console.log("Initializing web server module");

    await webServer.initialize();
  } catch (err) {
    console.error(err);

    process.exit(1); // Non-zero failure code
  }
}

async function shutdown(e) {
  let err = e;

  console.log("Shutting down");

  try {
    console.log("Closing web server module");

    await webServer.close();
  } catch (e) {
    console.log("Encountered error", e);

    err = err || e;
  }

  console.log("Exiting process");

  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
}

process.on("SIGTERM", () => {
  console.log("Received SIGTERM");

  shutdown();
});

process.on("SIGINT", () => {
  console.log("Received SIGINT");

  shutdown();
});

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception");
  console.error(err);

  shutdown(err);
});

startup();
