<template>
<div>
    <div 
      class="day-container" 
      :class="{today:isToday(day.dt_iso)}" 
      v-for="day in dayForecast" 
      :key="day.date"
    >
        <div>
            <p><strong>{{day.date}}</strong><em v-if="isToday(day.dt_iso)"> (today)</em></p>
            <p class="capitalize">{{day.description}}</p>
            <p><strong>clouds:</strong> {{day.clouds}}%, {{day.pressure}} hpa</p> 
        </div>
        <div>
            <div class="temperature" :class="color(day.temp_min)">{{(day.temp_min).toFixed(1)}}C</div>
            <div class="temperature" :class="color(day.temp_max)">{{(day.temp_max).toFixed(1)}}C</div> 
        </div> 
    </div>
</div>
</template>

<script>
import axios from 'axios'
import { DateTime } from "luxon";

export default {
    name: 'Weather',
    data () {
        return {
            weatherList: [],
            api_key: '078fadfe54abfc1d429dfdb585f18f6c',
        }
    },
    watch: {
        'eventBus.selectedMarker': {
            handler(newVal){
                this.getWeather(newVal);
            },
            deep: true,
            immediate: true
        }
    },
    computed: {
        dayForecast() {
            let forecast = [];
            for (let i=0; i<this.weatherList.length; i+=8) {
                if(this.weatherList[i]) {
                    let date= (this.weatherList[i].dt_txt).split(" ");
                    let dateISO = DateTime.fromISO(date[0]);
                    let day = {
                        dt_iso: dateISO,
                        date: dateISO.toFormat('EEE dd LLL'),
                        description: this.weatherList[i].weather[0].description,
                        clouds: this.weatherList[i].clouds.all,
                        pressure: this.weatherList[i].main.pressure,
                        temp_min: this.weatherList[i].main.temp_min,
                        temp_max: this.weatherList[i].main.temp_max,
                    }
                    forecast.push(day);
                }
            }
            return forecast;
        }
    },
    methods: {
        getWeather(newMarker){
            axios
            .get('https://api.openweathermap.org/data/2.5/forecast', {
                params: {
                    lat: newMarker.location.lat,
                    lon: newMarker.location.lng,
                    units: 'metric',
                    appid: this.api_key
                }
            })
            .then(response =>
            (this.weatherList = response.data.list)
            ).catch(function (error) {
            console.log(error);
            })
        },
        color (temperature) {
            if(temperature < 14){
                return 'blue';
            }
            else if (temperature >= 14 && temperature < 20) {
                return 'green';
            } 
            else if (temperature >= 20 && temperature <25) {
                return 'orange';
            }
            else return 'red';
        },
        isToday (date) {
            const now = DateTime.now();
            if(date.month === now.month && date.day === now.day && date.year === now.year){
                return true;
            }else {
                return false;
            }
        }
    }
}
</script>

<style scoped>

p {
    margin-bottom: 4px;
}

p::first-letter{
    text-transform: capitalize;
}

.blue {
    background: #3e5b9d;
}

.red {
    background: #e82e00;
}

.orange {
    background: #e78f09;
}

.green {
    background: #8bba0a;
}

.temperature {
    display: inline-block;
    padding: 2px 4px;
    color: white;
    font-weight: bold;
    font-size: 10px;
    margin: 2px;
}

.day-container {
    display: flex;
    justify-content: space-between;
    font-size: 11px;
    padding: 15px 18px;
    padding: 10px 18px;
}

.day-container:nth-child(odd) {
    background: #f7f7f7
}

.loading {
    text-align: center;
    margin-top: 18px;
}

.today {
    border-left: 2px solid  #3e5b9d;
}

</style>