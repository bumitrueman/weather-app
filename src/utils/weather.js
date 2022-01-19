const request = require("request");

const forcast = (address, callback) => {
  // weatherstack
  // const key = "178f5e7a34e738876220d87382366a4e";
  // const url = "http://api.weatherstack.com/current?access_key=" + key + "&query=" + encodeURIComponent(address);

  // openweathermap
  const key = "9e982b2905eda504436aba2231d27491";
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + encodeURIComponent(address) + "&appid=" + key + "&units=metric";

  request({ url: url, json: true }, (error, response) => {
    if (error) {
      error = "Unable to connect to weather service.";
      response = undefined;
    } else if (response.body.message) {
      error = "Unable to find location.";
      response = undefined;
    } else {
      error = undefined;
      response = {
        address: response.body.name,
        temp: response.body.main.temp,
        humidity: response.body.main.humidity,
        icon: response.body.weather[0].icon,
        body: response.body,
      };
    }
    callback(error, response);
    console.log(error, response);
  });
};

const output = (error, response) => {
  if (error) {
    console.log("Error", error);
  } else {
    console.log("Response", response);
    return response;
  }
};

module.exports = {
  forcast: forcast,
  output: output,
};
