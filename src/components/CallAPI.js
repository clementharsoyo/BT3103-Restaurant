import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
  extends: Line,
  data: function () {
    return {
        datacollection: {
            labels: [],
            rawData: [],
            datasets: [{ 
                data: [],
                fill: false,
                label: "Central",
                borderColor: "#3e95cd"
              }, {
                data: [],
                fill: false,
                label: "East",
                borderColor: "#8e5ea2"
              }, {
                data: [],
                fill: false,
                label: "National",
                borderColor: "#3cba9f"
              }, {
                data: [],
                fill: false,
                label: "North",
                borderColor: "#e8c3b9"
              }, {
                data: [],
                fill: false,
                label: "South",
                borderColor: "#c45850"
              }, {
                data: [],
                fill: false,
                label: "West",
                borderColor: "#2596be"
              }
            ]
        },
        options: {
            legend: { display: true },
            title: {
              display: true,
              text: 'PSI Twenty Hours Temperature (By Region)'
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
        axios.get(`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`)
        .then(response => {
            console.log(response.data)
            response.data.items.forEach(data => { 
                this.datacollection.labels.push(data.timestamp)
                this.datacollection.rawData.push(data.readings.psi_twenty_four_hourly)
            })
            for (let x = 0; x < this.datacollection.rawData.length; x++) {
              this.datacollection.datasets[0].data.push(this.datacollection.rawData[x].central)
              this.datacollection.datasets[1].data.push(this.datacollection.rawData[x].east)
              this.datacollection.datasets[2].data.push(this.datacollection.rawData[x].national)
              this.datacollection.datasets[3].data.push(this.datacollection.rawData[x].north)
              this.datacollection.datasets[4].data.push(this.datacollection.rawData[x].south)
              this.datacollection.datasets[5].data.push(this.datacollection.rawData[x].west)
            }
            this.renderChart(this.datacollection, this.options)
        })
    }
  },
  created () {
    this.fetchItems()
  }
}

