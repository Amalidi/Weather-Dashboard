// targeting recent searches
const recentSearchesContainer = $("#recent-searches-container");
// targeting form
const searchForm = $("#search-form");
// current date
const weatherInfoContainer = $("#weather-info-container");

const readFromLocalStorage = (key, defaultValue) => {
    // get from LS using key name
    const dataFromLS = localStorage.getItem(key);
  
    // parse data from LS
    const parsedData = JSON.parse(dataFromLS);
  
    if (parsedData) {
      return parsedData;
    } else {
      return defaultValue;
    }
  };

  const writeToLocalStorage = (key, value) => {
    // convert value to string
    const stringifiedValue = JSON.stringify(value);
  
    // set stringified value to LS for key name
    localStorage.setItem(key, stringifiedValue);
  }; 

  const constructUrl = (baseUrl, params) => {
    const queryParams = new URLSearchParams(params).toString();
  
    return queryParams ? `${baseUrl}?${queryParams}` : baseUrl;
  };
  
  const fetchData = async (url, options = {}) => {
    try {
      const response = await fetch(url, options);
  
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const renderCurrentData = (data) => {
      const currentWeatherCard = `<div
        class="current-weather text-white ml-1 mr-1 mt-3 mb-3"
        id="current-weather-card"
        >
        <div class="card-header d-flex">
            <h3 id="cityName">${data.cityName}</h3>
            <h3 class="px-5" id="currentdate">${moment
            .unix(1652526000)
            .format("dddd, Do MMM, YYYY")}</h3>
            <div class="card-box text-center">
            <img
                src="http://openweathermap.org/img/w/${data.weatherData.current.weather[0].icon}.png"
                alt="weather icon"
            />
            </div>
        </div>
        <div class="mt-1 p-4">
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Temperature
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${data.weatherData.current.temp}&deg; C</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Humidity
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${data.weatherData.current.humidity}&percnt;</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Wind Speed
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">${data.weatherData.current.wind_speed} MPH</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                UV Index
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">
                <span class="bg-success text-white px-3 rounded-2">${data.weatherData.current.uvi}</span>
            </div>
            </div>
        </div>
        </div>`

        weatherInfoContainer.append(currentWeatherCard);
  };

  const renderForecastData = () => {
      const forecastWeatherCards = `<div class="forecast-box" id="forecast-container">
        <h2 class="forecast-title pl-3 pr-3 text-center">5-Day Forecast</h2>
        <div
            class="forecast d-flex flex-row flex-wrap pt-3 pb-3 justify-content-between"
        >
            <!-- card 1 -->
            <div
            id="forcast-card"
            class="forecast-card d-flex flex-column align-items-center text-white m-1 p-4"
            >
            <h4 class="card-header w-100 text-center">MM/DD/YY</h4>
            <div class="card-body">
                <p class="card-text text-center">
                <img
                    src="http://openweathermap.org/img/w/04d.png"
                    alt="weather icon"
                />
                </p>
                <p class="card-text text-center">
                Temp : 28 <span>&#8451;</span>
                </p>
                <p class="card-text text-center">Humidity : 16%</p>
                <p class="card-text text-center">Wind Speed : 20 MPH</p>
                <p class="card-text text-center">
                UV Index:
                <span class="bg-success text-white px-3 rounded-2">
                    1.5</span
                >
                </p>
            </div>
            </div>
            <div
            id="forcast-card"
            class="forecast-card d-flex flex-column align-items-center text-white m-1 p-4"
            >
            <h4 class="card-header w-100 text-center">MM/DD/YY</h4>
            <div class="card-body">
                <p class="card-text text-center">
                <img
                    src="http://openweathermap.org/img/w/04d.png"
                    alt="weather icon"
                />
                </p>
                <p class="card-text text-center">
                Temp : 28 <span>&#8451;</span>
                </p>
                <p class="card-text text-center">Humidity : 16%</p>
                <p class="card-text text-center">Wind Speed : 20 MPH</p>
                <p class="card-text text-center">
                UV Index:
                <span class="bg-success text-white px-3 rounded-2">
                    1.5</span
                >
                </p>
            </div>
            </div>
            <div
            id="forcast-card"
            class="forecast-card d-flex flex-column align-items-center text-white m-1 p-4"
            >
            <h4 class="card-header w-100 text-center">MM/DD/YY</h4>
            <div class="card-body">
                <p class="card-text text-center">
                <img
                    src="http://openweathermap.org/img/wn/04d@2x.png"
                    alt="weather icon"
                />
                </p>
                <p class="card-text text-center">
                Temp : 28 <span>&#8451;</span>
                </p>
                <p class="card-text text-center">Humidity : 16%</p>
                <p class="card-text text-center">Wind Speed : 20 MPH</p>
                <p class="card-text text-center">
                UV Index:
                <span class="bg-success text-white px-3 rounded-2">
                    1.5</span
                >
                </p>
            </div>
            </div>
        </div>
        </div>`
        weatherInfoContainer.append(forecastWeatherCards);
  }

  const renderRecentSearches = () => {
    const recentSearches = readFromLocalStorage("rencentSearches", []);
    // const recentSearches =  ["London", "Tokyo", "Berlin"];
  
    if(recentSearches.length){

        const createRecentCity = (city) => {
            return `<li
                class="btn btn-outline-info text-center mt-2 mb-2 w-1"
                data-city="${city}"
            >
            ${city}
            </li>`;
        };

        const recentCities = recentSearches.map(createRecentCity).join("");

      //   render recent searches list
      const ul = `<ul class="list-group p-3">
         ${recentCities}
        </ul>`;
        recentSearchesContainer.append(ul);
    } else{
      //  show an elert
      const alert = `<div class="alert alert-warning text-center" role="alert">
          No recent searches
      </div>`;
      // append
      recentSearchesContainer.append(alert)
    }
  };

  const fetchWeatherData = async (cityName) => {
      // data from Api

        // get the url
        const currentDataUrl = constructUrl(
            "https://api.openweathermap.org/data/2.5/weather",
            {
              q: cityName,
              appid: "8109f605d79877f7488a194794a29013",
            }
          );

          const currentData = await fetchData(currentDataUrl);

          // get lat, lon and city name
          const lat = currentData?.coord?.lat;
          const lon = currentData?.coord?.lon;
          const displayCityName = currentData?.name;

        //   forcast url

          const forecastDataUrl = constructUrl(
            "https://api.openweathermap.org/data/2.5/onecall",
            {
              lat: lat,
              lon: lon,
              exclude: "minutely,hourly",
              units: "metric",
              appid: "8109f605d79877f7488a194794a29013",
            }
          );

          const forecastData = await fetchData(forecastDataUrl);

          return {
            cityName: displayCityName,
            weatherData: forecastData,
          };
  };

const handleRecentSearchClick = (event) => {
    const target = $(event.target)
    // check if the target is a list item 
    if(target.is("li")){
        // get data attribute
        const cityName = target.attr("data-city");
        console.log(cityName)
    }
};

const handleFormSubmit = async (event) => {
    event.preventDefault();
  
    // get form input value
    const cityName = $("#search-input").val();
  
    // validate
    if (cityName) {
        // fetch weather data
        const weatherData = await fetchWeatherData(cityName);


        // render current date
        renderCurrentData(weatherData);

        // render forcast data
        renderForecastData(weatherData);

        console.log(cityName)
      // get recentSearches from LS
      const recentSearches = readFromLocalStorage("recentSearches", []);
  
      // push city name to array
      recentSearches.push(cityName);
  
      // write recent searches to LS
      writeToLocalStorage("recentSearches", recentSearches);
  
      // remove previous items
      recentSearchesContainer.children().last().remove();
  
      // re-render recent cities
      renderRecentSearches();

    }
  };

const onReady= () => {
  renderRecentSearches();

};

recentSearchesContainer.click(handleRecentSearchClick);
searchForm.submit(handleFormSubmit);
$(document).ready(onReady);




