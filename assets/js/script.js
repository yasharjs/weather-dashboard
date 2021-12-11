



var apiCall = function(city){
    myKey = "54b595bf3d71cfd4083a4f576940e6e9"
    apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"&appid="+myKey+"&units=metric";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                var temp = data.main.temp;
                // console.log(data);
                // console.log("Temp: ",temp);
                // console.log("lat: ", data.coord.lat);
                // console.log("lon: ",data.coord.lon);
                // console.log("Name: ",data.name);
                // console.log("date: ", data.dt);



            })
        } else {
            alert("error");
        }
    })
}   


apiCall("santander");

