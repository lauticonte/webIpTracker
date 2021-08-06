import 'regenerator-runtime/runtime'


const ipInput = document.getElementById("ipInput");
const ipInputSubmit = document.getElementById("ipInputSumbit");

const disbaledTextareaIpAdress = document.getElementById("ipAdress")
const disbaledTextareaLocation = document.getElementById("location")
const disbaledTextareaTimezone = document.getElementById("timezone")
const disbaledTextareaIsp = document.getElementById("isp")

let ipInputValue;
let info = {
    "ip": "192.212.174.101",
    "location": {
        "country": "Us",
        "region": "California,",
        "lat": 34.04915,
        "lng": -118.09462,
        "timezone": "-07:00",
    },
    "isp": "Southern California Ediso",

}
let map;
let markerOnTheMap;

//

let api_url = 'https://geo.ipify.org/api/v1?';
let url;
//

map = L.map('mapid',
    {
        zoomControl: false,
    })

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

markerOnTheMap = L.marker([0, 0]).addTo(map);

const getIp = () => {
    if (!ipInput.value) {
        ipInput.placeholder = "Enter an IP or Domain";
        ipInput.classList += " placeholderRed"
        setTimeout(() => {
            ipInput.classList = "ipInput"

            ipInput.placeholder = "Search for IPs or Domains"
        }, 1000);
        return
    }
    return ipInput.value;
}

const getIpInfo = async (ipInputValue) => {
    url = "https://geo.ipify.org/api/v1?apiKey=at_QRQPY4QVlEJiJRSFynjTHBRotDs02&ipAddress=" + ipInputValue;
    info = await fetch(url).then(response => response.json()).then(data => data)
    onload()
}

ipInputSubmit.addEventListener("click", async () => {
    ipInputValue = await getIp();
    if(ipInputValue) { 
        getIpInfo(ipInputValue);
    }
    else{
        return
    }
})

const onload = () => {
    disbaledTextareaIpAdress.innerHTML = info.ip;
    disbaledTextareaIsp.innerHTML = info.isp;
    disbaledTextareaLocation.innerHTML = `${info.location.region} ${info.location.country} `
    disbaledTextareaTimezone.innerHTML = `UTC ${info.location.timezone}`
    map.setView([info.location.lat, info.location.lng], 13)
    markerOnTheMap.setLatLng([info.location.lat, info.location.lng])

}



onload();
