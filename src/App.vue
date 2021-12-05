<template>
  <div class="container">

    <div class="map">
      <google-map />
    </div>

    <div 
    class="sidebar info-container"
    :opened="eventBus.infoOpened"
    v-if="eventBus.infoOpened"
    >
      <betshop-info />
    </div>

    <div class="sidebar weather-container"
    :opened="eventBus.infoOpened"
    v-if="eventBus.infoOpened"
    >
      <h4>Weather</h4>
      <weather></weather>
    </div>
  </div>
</template>

<script>
import BetshopInfo from './components/BetshopInfo';
import GoogleMap from './components/Map';
import Weather from './components/Weather';

export default {
  name: 'App',
  components: {
    BetshopInfo,
    GoogleMap,
    Weather
  },
  methods: {
    isObjectEmpty(obj){
      return Object.entries(obj).length === 0;
    },
    removeEmptyProps(obj){
      for(let o in obj){
        if(typeof(obj[o]) === 'object'){
          if(obj[o] === null || this.isObjectEmpty(obj[o])){
            delete obj[o];
          } 
          else {
            this.removeEmptyProps(obj[o])
          }
        }
        else if (typeof(obj[o]) === 'undefined' || obj[o] === ''){
          delete obj[o];
        }
      }
    },
    iLikeStrings(obj){
      for(let o in obj){
        if(typeof(obj[o]) === 'object'){
          if(obj[o] === null || this.isObjectEmpty(obj[o]) || Array.isArray(obj[o])){
            delete obj[o];
          }
          else {
            this.iLikeStrings(obj[o])
          }
        }
        else if (typeof(obj[o]) !== 'string'){
          delete obj[o];
        }
      }
      for(let o in obj){
        if(typeof(obj[o]) === 'object'){
          if(this.isObjectEmpty(obj[o])){
            delete obj[o];
          }
        }
      }
    }
  }
}
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

body {
  background: #ebebeb;
  font-size: 15px;
  color: #6e6e6e;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

.container {
  display: grid;
  grid-template-columns: 400px 251px;
  grid-template-rows: auto auto;
  row-gap: 15px;
  column-gap: 15px;
  justify-content: center; 
  margin: 20px 0px;
}

.weather-container {
  padding-top: 22px;
}

.map {
  grid-column: 1 / span 1;
  grid-row: 1 / span 2;
}

.sidebar {
  grid-column: 2 / span 1;
  background: white;
}

h4 {
  text-align: center;
  margin-bottom: 5px;
}

@media only screen and (max-width: 780px) {

  .container {
    grid-template-columns: minmax(auto,400px);
    grid-template-rows: repeat(3, auto);
  }

  .map {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }

  .info-container {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }

  .weather-container {
    grid-column: 1 / span 1;
    grid-row: 3 / span 1;
  }
}
</style>
