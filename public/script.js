window.onload = () => {
    // getLocation and showPosition code copied from https://www.w3schools.com/html/html5_geolocation.asp
    var output = document.getElementById("output");

    if (!navigator.geolocation) {
        output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
        return;
    }

    function success(position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;

        let darkSkyURL = `https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/YOUR_API_KEY_HERE/${latitude},${longitude}`;
        AJAXget(darkSkyURL, setWeather);

        let googleMapsURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY_HERE`;
        AJAXget(googleMapsURL, setLocation);

        setDate();
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    function AJAXget(url, callback) {
        let http = new XMLHttpRequest();
        http.open('GET', url, true);
        http.send();
        http.onreadystatechange = () => {
            if (http.readyState == 4 && http.status == 200) {
                callback(JSON.parse(http.response));
            }
        }
    }

    function setWeather(data) {
        output.innerHTML = `${Math.round(data.currently.temperature)}° Fahrenheit`;
        setSkycon(data.currently.icon);
    }

    function setSkycon(currentWeather) {
        var skycons = new Skycons({ "color": "teal" });
        skycons.add("icon1", currentWeather);
        skycons.play();
    }

    function setLocation(data) {
    	document.getElementById("location").innerHTML = "<em>" + data.results[0].formatted_address + "</em>";
    }

    function setDate() {
    	let currentDate = new Date();
    	document.getElementById("date").innerHTML = currentDate.toDateString();
    }

    navigator.geolocation.getCurrentPosition(success, error);
}
