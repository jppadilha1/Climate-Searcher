let input = document.querySelector('.search-text');
let Warning = document.querySelector('.warning');
let painel = document.querySelector('.painel');

document.querySelector('.search-submit').addEventListener('click', () => {
    if(input.value !== '') {
        painel.style.display = 'none';
        Warning.innerHTML = 'Carregando...'
        readInput();
    }
});

input.addEventListener('keyup', (e) => {
    if(input.value !== '' && e.code === "Enter") {
        painel.style.display = 'none';
        Warning.innerHTML = 'Carregando...'
        readInput();
    }
});

async function readInput() {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input.value)}&appid=9041a63e1d9b241be76ec78de5452c76&units=metric&lang=pt_br`;
    
    let results = await fetch(url);
    let json = await results.json();

    Warning.innerHTML = '';
    input.value = '';
    
    if (json.cod == "200") {
        showData({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            temp_icon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        })
    } else {
        Warning.innerHTML = 'Não foi possível encontrar sua pesquisa';
    }

};

function showData(data) {
    painel.style.display = 'flex';

    document.querySelector('.painel h2').innerHTML = `${data.name}, ${data.country}`;
    document.querySelector('.temperature').innerHTML = `${data.temp} ºC`;
    document.querySelector('.wind').innerHTML = `${data.windSpeed} km/h`;
    document.querySelector('.painel-temperature img').src = `http://openweathermap.org/img/wn/${data.temp_icon}@2x.png`;
    document.querySelector('.wind-point').style.transform = `rotate(${data.windAngle-90}deg)`
}