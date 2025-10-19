const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const usersRoutes = require("./routes/users-routes");
const HttpError = require("./models/http-error");

const app = express();

app.use(bodyParser.json());

app.use(express.json());
app.use("/api/places", placesRoutes);
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route.", 404);
  throw error;
});

// app.use((error,  req, res, next) => {

//     if(res.headerSent){
//         return next(error);
//      }
//    res.status(error.code ||500);
//    res.json({message: error.message || 'An unkown error occured' });

// });

app.use((error, req, res, next) => {
  // Kolla om svaret redan skickats
  if (res.headersSent) {
    return next(error);
  }

  // Sätt statuskod – default 500
  const status = error.code || 500;

  // Logga bara meddelandet i konsolen (inte hela objektet)
  console.error(`[${status}] ${error.message}`);

  // Skicka endast ett rent JSON-svar till klienten
  res.status(status).json({
    message: error.message || "An unknown error occurred",
  });
});

app.listen(5000, () => console.log("Server running on :5000"));
