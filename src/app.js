const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./utils/weather");

const app = express();
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialsDirectoryPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsDirectoryPath);

app.get("/", (req, res) => {
  context = {
    title: "Weather App",
    name: "Bumi",
  };
  res.render("index", context);
});

app.get("/about", (req, res) => {
  context = {
    title: "About",
    name: "Bumi",
  };
  res.render("about", context);
});

app.get("/help", (req, res) => {
  context = {
    title: "Help",
    name: "Bumi",
  };
  res.render("help", context);
});

app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!req.query.address) {
    context = {
      error: "Please provided an address.",
    };

    return res.send(context);
  }

  weather.forcast(address, (error, forcastData) => {
    if (error) {
      context = {
        error:error,
      }
      return res.send(context);
    } else {
      const context = {
        address: forcastData.address,
        temp: forcastData.temp,
        humidity: forcastData.humidity,
        icon: forcastData.icon,
      };
      return res.send(context);
    }
  });
});

app.get("/help/*", (req, res) => {
  context = {
    message: "Help Article Not Found.",
  };
  res.render("404", context);
});

app.get("*", (req, res) => {
  context = {
    message: "Ops! Something went wrong.",
  };
  res.render("404", context);
});

app.listen(3000, () => {
  console.log("Server starting...");
  console.log("Listening at port: 3000");
});
