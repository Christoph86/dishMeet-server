require("dotenv/config");// ℹ️ Gets access to environment variables/settings
require("./db");// ℹ️ Connects to the database
const express = require("express"); // Handles http requests (express is node js framework)
const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
app.use("/api", require("./routes/index.routes"));
app.use("/api", require("./routes/auth.routes"));
app.use("/api", require("./routes/recipe.routes"));
app.use("/api", require("./routes/post.routes"));



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
