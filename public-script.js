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
        getWeather(latitude, longitude);
    }

    function error() {
        output.innerHTML = "Unable to retrieve your location";
    }

    function processHTTP(http) {
        http.onreadystatechange = () => {
            // 4: request is complete, 200: OK
            if (http.readyState == 4 && http.status == 200) {
                try {
                    var data = JSON.parse(http.response);
                    console.log(data);
                } catch (err) {
                    console.log(err);
                }
                output.innerHTML = `It is currently ${data.currently.temperature}° Fahrenheit`;
            }
        }
    }

    function getWeather(latitude, longitude) {
        let urlString = `https://api.darksky.net/forecast/API_KEY_GOES_HERE/${latitude},${longitude}`;

        let http = new XMLHttpRequest();

        // Third parameter determines if request is/isn't asynchronous
        http.open('GET', urlString, true);
        http.send();

        processHTTP(http);
    }

    output.innerHTML = "<p>Locating...</p>"

    navigator.geolocation.getCurrentPosition(success, error);
}
