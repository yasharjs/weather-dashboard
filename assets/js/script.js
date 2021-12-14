//initialize variables
var btnSubmit = document.querySelector(".submit");
var userInput = document.querySelector("#userInput");
var currentForecast = document.querySelector(".current-forecast");
var myKey = "54b595bf3d71cfd4083a4f576940e6e9"
var searchHistoryEl = document.querySelector(".search-history");
var historyArray = []; 


//get UV index from the "one call" weather api
var getUviIndex = function(lon,lat) {
    apiUrl = " https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" +lon +"&appid=" + myKey +"&exclude=daily,minutely,hourly";
    
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var dataTemp = data.current.uvi;
                var tempClass;
                var uvi  =  document.createElement("p");
                var s = document.createElement("span");
                if(dataTemp <= 2){
               
                    tempClass = "bg-success";
                }

                else if(6> dataTemp && dataTemp > 2){
                    tempClass = "bg-warning"
                }

                else if(8> dataTemp && dataTemp> 5){
                    //custom class to set the background to orange
                    s.classList.add("bg-orange");
                }

                else{
                    tempClass = "bg-alert";
                }
                
                //change color based on UV index
                s.classList.add(tempClass);
                //UV style
                s.setAttribute("style","display:inline-block;width:3.5rem;text-align:center;border-radius:10%;color:white");
                //UV content
                s.textContent = dataTemp;
                //display UV index on DOM
                uvi.textContent ="UV Index: ";
                uvi.appendChild(s);
                currentForecast.appendChild(uvi);
            })
            
        }
        else{
            console.log("error on uvi")
        }
    })

 
}

//display current forecast for 'city'
var apiCall = function(city){
    currentForecast.innerHTML = "";
    historyArray.push(city);
    console.log(historyArray);
   //get API url
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+myKey+"&units=metric";

    //fetch url
    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);

                //weather icon
                var iconEl = document.createElement("img");
                iconEl.setAttribute("src","http://openweathermap.org/img/wn/" + data.weather[0].icon +"@2x.png");
                iconEl.setAttribute("style"," width:3rem;height:3rem;");
                
                //date
                var dateEl = document.createElement("span");
                dateEl = moment().format("M/D/Y")
              
        
                //create name variable
                var name = document.createElement("h2");
                name.classList.add("font-weight-bold");

                //add date and icon to name element
                name.textContent = data.name +" (" + dateEl +") ";
                name.append(iconEl);

                //create temp variable
                var temp = document.createElement("p");
                temp.textContent = "Temp: " +Math.floor(data.main.temp )+ " °C";
               
                //create humidity variable
                var humidity = document.createElement("p");
                humidity.textContent = "Humidity: " +data.main.humidity + " %";
                
                //create wind variable
                var wind = document.createElement("p");
                wind.textContent = "Wind: " +data.wind.speed + " MPH";

                //create UV index
                var lon = data.coord.lon;
                var lat = data.coord.lat;
                getUviIndex(lon, lat);

                //display values in DOM
                currentForecast.setAttribute("style","border:1px solid;background-color:rgba(0,0,0,0.2)");
                currentForecast.append(name,temp,wind,humidity);

            })
        } else {
            alert("error");
        }
    })
}   

//get city name and pass it to apiCall()
var getUserInput = function(event){
    
    var city = userInput.value.trim();
    if(city){
       // userInput.value = "";
        apiCall(city);
    }
    else{
        alert("Please enter a valid input")
    }
    

}

var getBtnValue = function(event){
    apiCall(event.target.textContent);
}

var loadSearchHistory = function(){

}


loadSearchHistory();
//run getUserInput when clicked
btnSubmit.addEventListener("click",getUserInput);

searchHistoryEl.addEventListener("click",getBtnValue);

