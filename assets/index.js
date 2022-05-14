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

  const renderCurrentData = () => {
      const currentWeatherCard = `<div
        class="current-weather text-white ml-1 mr-1 mt-3 mb-3"
        id="current-weather-card"
        >
        <div class="card-header d-flex">
            <h3 id="cityName">Name of City</h3>
            <h3 class="px-5" id="currentdate">MM/DD/YY</h3>
            <div class="card-box text-center">
            <img
                src="http://openweathermap.org/img/w/04d.png"
                alt="weather icon"
            />
            </div>
        </div>
        <div class="mt-1 p-4">
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Temperature
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">16&deg; C</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Humidity
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">20&percnt;</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                Wind Speed
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">10 MPH</div>
            </div>
            <div class="row g-0">
            <div class="col-sm-12 col-md-4 p-2 border fw-bold">
                UV Index
            </div>
            <div class="col-sm-12 col-md-8 p-2 border">
                <span class="bg-success text-white px-3 rounded-2">1.5</span>
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

const handleRecentSearchClick = (event) => {
    const target = $(event.target)
    // check if the target is a list item 
    if(target.is("li")){
        // get data attribute
        const cityName = target.attr("data-city");
        console.log(cityName)
    }
};

// const handleFormSubmit = (event) => {
//     event.preventDefault();

//     // form input
//     const cityName = $("#search-input").val();

//     // validate
//     if(cityName){

//         const recentSearches = readFromLocalStorage("recentSearches", []);

//         // city name into an array
//         recentSearches.push(cityName);

//         // write recent searches to LS
//         writeToLocalStorage("recentSearches", recentSearches);

//         // remove previous items
//         recentSearchesContainer.children().last().remove();

//         // re-render recent cities
//         renderRecentSearches();

//     }
// };

const handleFormSubmit = (event) => {
    event.preventDefault();
  
    // get form input value
    const cityName = $("#search-input").val();
  
    // validate
    if (cityName) {
        // data from Api

        // render current date
        renderCurrentData();

        // render forcast data
        renderForecastData();

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




