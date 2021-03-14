<template>
  <div class="chart">
    <ul id="routerList">
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/orders" exact>Orders</router-link></li>
        <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
    </ul>
    <h1>Order Summary in Bar Chart</h1>
    <Chart></Chart>
    <h1>Line Chart</h1>
    <chart1></chart1>
  </div>
</template>

<script>
import Chart from "./BarChart.js";
import Chart1 from "./CallAPI.vue"
export default {
  components: {
    Chart,
    Chart1
  }
};
</script>
<style>
#routerList {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
</style>