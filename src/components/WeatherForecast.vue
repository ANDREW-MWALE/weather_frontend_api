<template>
  <div v-if="forecast && forecast.length > 0">
    <h2>16-Day Forecast</h2>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Max Temp (°C)</th>
          <th>Min Temp (°C)</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="day in forecast" :key="day.date">
          <td>{{ day.date }}</td>
          <td>{{ day.maxTemp }}°C</td>
          <td>{{ day.minTemp }}°C</td>
          <td>{{ day.weatherDescription }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    forecast: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any styles you need for the forecast component */
</style>
