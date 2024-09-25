<template>
  <div id="app">
    <h1>Weather Application</h1>

    <!-- Flex container for input fields and buttons -->
    <div class="input-container">
      <input type="text" v-model="city" placeholder="Enter city name" />
      <input type="text" v-model="country" placeholder="Enter country code" />
      <button @click="fetchCurrentWeather">Get Current Weather</button>
      <button @click="fetchWeatherForecast">Get 16-Day Forecast</button>
    </div>

    <div v-if="weatherData">
      <h2>Weather in {{ weatherData.cityName }}, {{ weatherData.countryCode }}</h2>
      <p>Temperature: {{ weatherData.temp }}°C</p>
      <p>Feels like: {{ weatherData.appTemp }}°C</p>
      <p>Description: {{ weatherData.weatherDescription }}</p>
    </div>

    <WeatherForecast v-if="forecast" :forecast="forecast" />

    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import WeatherForecast from './components/WeatherForecast.vue'; // Import the new component

export default {
  components: {
    WeatherForecast
  },
  data() {
    return {
      city: '',
      country: '',
      weatherData: null,
      forecast: null,
      errorMessage: '',
    };
  },
  methods: {
    async fetchCurrentWeather() {
      this.errorMessage = '';
      try {
        const response = await axios.get(`http://localhost:8084/api/weather/current?city=${this.city}&country=${this.country}`);
        this.weatherData = response.data;
      } catch (error) {
        console.error("Error fetching current weather:", error.response ? error.response.data : error);
        this.errorMessage = "Could not fetch current weather data. Please check your inputs.";
      }
    },
   async fetchWeatherForecast() {
     this.errorMessage = '';
     try {
       const response = await axios.get(`http://localhost:8084/api/weather/forecast/daily?city=${this.city}&country=${this.country}`);
       this.forecast = response.data.forecast || []; // Ensure this matches your backend response structure
     } catch (error) {
       console.error("Error fetching weather forecast:", error.response ? error.response.data : error);
       this.errorMessage = error.response ? error.response.data.message : "Could not fetch weather forecast. Please check your inputs.";
     }
   }
  },
};
</script>

<style scoped>
/* Center the content */
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;
}

/* Flex container for inputs and buttons */
.input-container {
  display: flex;
  gap: 10px; /* Adds space between items */
  justify-content: center; /* Centers items horizontally */
  align-items: center; /* Centers items vertically within the container */
}

/* Add any other necessary styling */
h1 {
  color: #333;
}

input {
  padding: 10px;
  width: 200px;
}

button {
  padding: 10px;
  cursor: pointer;
}
</style>
