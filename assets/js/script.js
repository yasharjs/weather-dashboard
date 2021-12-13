
var btnSubmit = document.querySelector(".submit");
var userInput = document.querySelector("#userInput");
var currentForecast = document.querySelector(".current-forecast");
myKey = "54b595bf3d71cfd4083a4f576940e6e9"



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
                
                s.classList.add(tempClass);
                s.setAttribute("style","display:inline-block;width:30px;text-align:center;border-radius:30%");
                s.textContent = dataTemp;
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

var apiCall = function(city){
   
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+myKey+"&units=metric";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                console.log(data);

                //create name variable
                var name = document.createElement("h2");
                name.classList.add("font-weight-bold");
                name.textContent = data.name;

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

                currentForecast.append(name,temp,wind,humidity);

            })
        } else {
            alert("error");
        }
    })
}   





var getUserInput = function(event){
    var city = userInput.value.trim();
    if(city){
        userInput.value = "";
        apiCall(city);
    }
    else{
        alert("Please enter a valid input")
    }
   // addToHistory(city);

}
btnSubmit.addEventListener("click",getUserInput);

