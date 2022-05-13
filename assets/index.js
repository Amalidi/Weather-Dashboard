// targeting recent searches
const recentSearchesContainer = $("#recent-searches-container");

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

  const renderRecentSearches = () => {
    const recentSearches = readFromLocalStorage("rencentSearches", []);
  
    if(recentSearches.length){
      //   render recent searches list
      const ul = `<ul class="list-group p-3" id="city-list">
      <li
        class="btn btn-outline-info text-center mt-2 mb-2 w-1"
        data-city="London"
      >
        London
      </li>
      <li
        class="btn btn-outline-info text-center mt-2 mb-2 w-100"
        data-city="Tokyo"
      >
        Tokyo
      </li>
      <li
        class="btn btn-outline-info text-center mt-2 mb-2 w-100"
        data-city="Berlin"
      >
        Berlin
      </li>
      <li
        class="btn btn-outline-info text-center mt-2 mb-2 w-100"
        id="city"
      >
        Birmingham
      </li>
    </ul>`
    } else{
      //  show an elert
      const alert = `<div class="alert alert-warning text-center" role="alert">
          No recent searches
      </div>`
      // append
      recentSearchesContainer.append(alert)
    }
  };

const handleRecentSearchClick = (event) => {
    const target = $(event.target)
    // check if the target is a list item 
    if(target.is("li")){
        // get data attribute
        const cityName = target.attr("data-city")
        console.log(cityName)
    }
}


const onReady= () => {
  renderRecentSearches()

};

recentSearchesContainer.click(handleRecentSearchClick)
$(document).ready(onReady);
