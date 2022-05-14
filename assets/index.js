// targeting recent searches
const recentSearchesContainer = $("#recent-searches-container");
// targeting form
const searchForm = $("#search-form");

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




