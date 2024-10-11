//api key 
//     fetch('TkXAQ4tzk1T4t3NVNLLUa6BXrnPJVPBP');
const details = document.querySelector(".details");
//grab the data from the form
const updateUI = (data) => {
    // destructure properties
    // const { cityDets, weather } = data;
    let citydeets = data.citydeets;
    let weather = data.weatherdeets[0];
    console.log(citydeets);
    console.log(weather);
  
    // update details template
    details.innerHTML = `
      <h5 class="my-3">${citydeets.EnglishName}</h5>
      <div class="my-3">${weather.WeatherText}</div>
      <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
      </div>
    `;
  
    //update the night/day & icon images
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
    time.setAttribute('src', timeSrc);
  
    //remove the d-none class if present
    if(card.classList.contains('d-none')){
      card.classList.remove('d-none');
    }
  };
  
const cityForm = document.querySelector('form');
const apikey = "TkXAQ4tzk1T4t3NVNLLUa6BXrnPJVPBP";
const url="http://dataservice.accuweather.com/locations/v1/cities/search?";


//new function
async function getcitydeets(city){   
    const apiURL= `${url}apikey=${apikey}&q=${city}`;
    // const apiURL= `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=TkXAQ4tzk1T4t3NVNLLUa6BXrnPJVPBP&q=${city}`;
    const response = await fetch(apiURL);
    const citydeets = await response.json();
    // console.log(citydeets[0])
   return citydeets[0];
//    getweatherdeets(key);

}
const weatherURL= "http://dataservice.accuweather.com/currentconditions/v1/"
async function getweatherdeets(citykey){
    // const apiURL=`${weatherURL}${citykey}?apikey=${apikey}`;
    const apiURL="http://dataservice.accuweather.com/currentconditions/v1/202396?apikey=TkXAQ4tzk1T4t3NVNLLUa6BXrnPJVPBP";
    const response = await fetch(apiURL);
    const weatherdeets = await response.json();
    // console.log(weatherdeets);
    return weatherdeets;

    //http://dataservice.accuweather.com/currentconditions/v1/202396?apikey=TkXAQ4tzk1T4t3NVNLLUa6BXrnPJVPBP

}
async function getdeets(loca) {
    const citydeets = await getcitydeets(loca);
    // console.log(citydeets);
    const weatherdeets = await getweatherdeets(citydeets.key);
    // console.log(weatherdeets);
    return { citydeets, weatherdeets};
    
}
cityForm.addEventListener('submit', (e) => {
    //disable defalut behvaior basicalluy refresh everything
    e.preventDefault();
    //use cityform dom to get city value
    const city = cityForm.city.value.trim();
    console.log(city);
    cityForm.reset();
    if(city.length > 0){ 
        getdeets(city).then((deets)=>{
            // console.log(deets);
            updateUI(deets)
        });
    } else {
        alert("pls enter city")
    }

   
});