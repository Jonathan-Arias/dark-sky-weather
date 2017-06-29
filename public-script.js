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

        let darkSkyURL = `https://api.darksky.net/forecast/YOUR_API_KEY_HERE/${latitude},${longitude}`;
        AJAXget(darkSkyURL, setWeather);

        let googleMapsURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=YOUR_API_KEY_HERE`;
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
        document.getElementById("location").innerHTML = "<em>" + data.results[2].address_components[0].short_name + "</em>";
    }

    function setDate() {
        let currentDate = new Date();
        // let year = currentDate.getFullYear();
        // let month = currentDate.getMonth();
        // let date = currentDate.getDate();
        // let day = currentDate.getDay();
        document.getElementById("date").innerHTML = currentDate.toDateString();
    }

    navigator.geolocation.getCurrentPosition(success, error);
}
