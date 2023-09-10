const cityElem = document.querySelector('.city');
const tempElem = document.querySelector('.temp');
const cities = Array.from(document.querySelectorAll('.list-item'));

getWeather('Bishkek, KG')

cities.forEach(item => {
    item.addEventListener('click', (e) => {
            const city = e.target.innerHTML;
            const country = e.target.getAttribute('data-country');
            let state = null;
            let cityData = null;
            if(e.target.getAttribute('data-state')){
                state = e.target.getAttribute('data-state');
                str = city+','+state+','+country;
            } else {
                str = city+','+country;
            }

            getWeather(cityData)
        }
    )
})

function getWeather(cityData) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityData}&limit=5&appid=1ae43c884f9ede1dd50112fa3d0ff9fa`)
    .then(response => response.json())
    .then(json => {
            const city = {};
            city.name = json[0].local_names.ru;
            city.lat = json[0].lat;
            city.lon = json[0].lon;
            return city
        })
    .then((city)=>{
            fetch(`http://api.openweathermap.org/data/2.5/weather/?lat=${city.lat}&lon=${city.lon}&units=metric&appid=1ae43c884f9ede1dd50112fa3d0ff9fa`)
            .then(response => response.json())
            .then(res => {
                cityElem.innerHTML = res.name
                tempElem.innerHTML = Math.round(res.main.temp);
            })
        }
    )
}



