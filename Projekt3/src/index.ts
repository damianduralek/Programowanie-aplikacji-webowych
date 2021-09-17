class App {
    opwApiKey = 'a5b12b084323812f1b9032fb3ac3eb0e';
    cities: number = 0;

    constructor() {
        this.addCity();
        this.fetchFromStorage(true);
        //odswiezanie co 1 min
        setInterval(()=> this.fetchFromStorage(false),60000);
    }

    //dodanie miasta przez button
    addCity(){
        const addBtn = <HTMLInputElement> document.getElementById('add');
        addBtn.addEventListener('click', (ev:Event) => this.getCityName());
    }

    //pobieranie danych z api i zwracanie obiektu weatherData (json)
    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${this.opwApiKey}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        return weatherData;
    }

    //pobieranie nazwy miasta z inputa i wywolywanie getCityWeather
    getCityName(){
        const cityInput = <HTMLInputElement>document.getElementById('cityName');
        const city = cityInput.value;
        this.getCityWeather(city);
    }
   

    //tworzenie nowego okna pogodowego i zapis do local storage
    async getCityWeather(city: string) {
        const weather = await this.getWeather(city);

        //pobieranie danych z jsona
        const name = weather.name;
        const temp = Math.round(weather.main.temp - 273.15).toString();
        const sky = weather.weather[0].main;
        const pressure = weather.main.pressure;
        const humidity = weather.main.humidity;

        //tworzenie szkieletu
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute("id","weatherData" + (this.cities-1));
        const btnDelete = document.createElement('button');
        btnDelete.innerText = "delete"
        btnDelete.addEventListener("click", () =>{
            console.log("xDD")
            card.parentElement.removeChild(card)
            localStorage.removeItem("weatherData"+(this.cities-1));
            this.cities--
            console.log(this.cities +" góra")
        })
        const weatherCityName = document.createElement('h1');
        const weatherCityTemp = document.createElement('p');
        const weatherCitySky = document.createElement('p');
        const weatherCityPressure = document.createElement('p');
        const weatherCityHumidity = document.createElement('p');

        //dodanie styli do szkieletu
        card.classList.add('card');

        //uzupelnienie szkieletu danymi
        weatherCityName.innerHTML = name;
        weatherCityTemp.innerHTML = "Temp: " + temp +"&deg;C";
        weatherCitySky.innerHTML = "Sky: " + sky;
        weatherCityPressure.innerHTML = "Pressure: " + pressure + " hPA";
        weatherCityHumidity.innerHTML = "Humidity: " + humidity + "%";

        //wrzucenie szkieletu z danymi na strone
        const divs = document.getElementById('divs');
        divs.appendChild(card);
        card.appendChild(btnDelete);
        card.appendChild(weatherCityName);
        card.appendChild(weatherCityTemp);
        card.appendChild(weatherCitySky);
        card.appendChild(weatherCityPressure);
        card.appendChild(weatherCityHumidity);

        //czyszczenie inputa i zapisanie do pamieci
        const cityInput = <HTMLInputElement>document.getElementById("cityName");
        cityInput.value = "";
        this.saveData(weather);
    }

    fetchFromStorage(bool:boolean){
        this.deleteWindows();
        const tab = localStorage.length;

        for (let i = 0; i < tab; i++) {
            
            let data;
            data = localStorage.getItem("weatherData" +i);
            console.log(data)
            const dataJson= JSON.parse(data);
            //console.log(dataJson)
            if(bool === true){
                
            this.getCityWeatherFromStorage(dataJson,true);
            }
            else{
                this.getCityWeatherFromStorage(dataJson,false);
            }
        }
    }

    //pobieranie z localStorage
    async getCityWeatherFromStorage(dataJson:any,bool:boolean) {
        
        console.log(dataJson + "YO")
            if(dataJson != null){
                const weather = await this.getWeather(dataJson.name);
                //console.log(weather)
    
            //pobieranie danych z jsona
            const name = weather.name;
            const temp = Math.round(weather.main.temp - 273.15).toString();
            const sky = weather.weather[0].main;
            const pressure = weather.main.pressure;
            const humidity = weather.main.humidity;
    
            //tworzenie szkieletu
            const card = document.createElement('div');
            card.className = 'weatherBoxClass'
            card.setAttribute("id","weatherData" + (this.cities));
            
            
            const weatherCityName = document.createElement('h1');
            
            const weatherCityTemp = document.createElement('p');
            const weatherCitySky = document.createElement('p');
            const weatherCityPressure = document.createElement('p');
            const weatherCityHumidity = document.createElement('p');
    
            //dodanie styli do szkieletu
            card.classList.add('card');
    
            //uzupelnienie szkieletu danymi
            const btnDelete = document.createElement('button');
            btnDelete.innerText = "delete"
            btnDelete.addEventListener("click", () =>{
            
            
                console.log(this.cities +" dół")
            card.parentElement.removeChild(card)
            //localStorage.removeItem(card.id);
            localStorage.removeItem("weatherData"+(this.cities-1));
            this.cities--;
            })
            
            weatherCityName.innerHTML = name;
            
            weatherCityTemp.innerHTML = "Temp: " + temp +"&deg;C";
            weatherCitySky.innerHTML = "Sky: " + sky;
            weatherCityPressure.innerHTML = "Pressure: " + pressure + " hPA";
            weatherCityHumidity.innerHTML = "Humidity: " + humidity + "%";
    
            //wrzucenie szkieletu z danymi na strone
            const space = document.getElementById('divs');
            space.appendChild(card);
            card.appendChild(btnDelete);
            card.appendChild(weatherCityName);
            card.appendChild(weatherCityTemp);
            card.appendChild(weatherCitySky);
            card.appendChild(weatherCityPressure);
            card.appendChild(weatherCityHumidity);
    
            //czyszczenie inputa
            const cityInput = <HTMLInputElement>document.getElementById("cityName");
            cityInput.value = "";
            if(bool === true)
            this.saveData(weather);
            }
                
    }   

    //zapis do local storage
    saveData(data: any) {
        localStorage.setItem('weatherData' + this.cities, JSON.stringify(data));
        this.cities++;
        
    }

    //wyciaganie z pamieci
    getData() {
        const data = localStorage.getItem('weatherData'+(this.cities+1));
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }

    //usuawnie okienek
    deleteWindows(){
        const div= document.getElementById('divs');
        div.textContent = "";
    }
}

const app = new App();