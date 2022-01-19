const form = document.querySelector("form");
const search = document.getElementById("search");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const address = search.value;

  const display_icon = document.getElementById("display_icon");
  const display_address = document.getElementById("display_address");
  const display_temp = document.getElementById("display_temp");
  const display_humidity = document.getElementById("display_humidity");

  display_icon.src = "";
  display_address.textContent = "Fetching temmperature data...";
  display_temp.textContent = "";
  display_humidity.textContent = "";

  fetch("/weather?address=" + encodeURIComponent(address)).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        display_address.textContent = data.error;
      } else {
        display_icon.src = "http://openweathermap.org/img/wn/" + data.icon + "@2x.png";
        display_address.textContent = "Location: " + data.address;
        display_temp.textContent = "Temperature: " + data.temp + " 'C";
        display_humidity.textContent = "Humidity: " + data.humidity + " %";
      }
    });
  });
});
