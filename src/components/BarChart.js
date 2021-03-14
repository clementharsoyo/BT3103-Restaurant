import { Bar } from 'vue-chartjs'
import database from '../firebase.js'

export default {
  extends: Bar,
  data: function () {
    return {
        itemsOrdered: [], 
        datacollection: {
            labels: ["Pork Fried Rice", "Mapo Tofu", "Sambal KangKung", "Cereal Prawn", "Dry Beef Hor Fun", "Prawn omelette"],
            datasets: [{
                label: "Dish",
                backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850", "#2596be"],
                data: []
              }]
        },
        options: {
            legend: { display: false },
            title: {
              display: true,
              text: 'Total Number of Dish'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            },
            responsive: true,
            maintainAspectRatio: false
        }
    }
  },
  methods: {
    fetchItems: function () {
      database.collection('orders').get().then(querySnapShot => {
        querySnapShot.forEach(doc => { 
            this.itemsOrdered.push(doc.data().item)
        })
        console.log("Items Ordered")
        console.log(this.itemsOrdered)
        let temp = [0, 0, 0, 0, 0, 0] //To store temporary value of orders
        for(let x = 0; x < this.itemsOrdered.length; x++) {
            for (let y = 0; y < this.itemsOrdered[x].length; y++) {
                let food = this.itemsOrdered[x][y].name
                if (food == "Pork Fried Rice") {
                    temp[0] += this.itemsOrdered[x][y].amount;
                } else if (food == "Mapo Tofu") {
                    temp[1] += this.itemsOrdered[x][y].amount;
                } else if (food == "Sambal KangKung") {
                    temp[2] += this.itemsOrdered[x][y].amount;
                } else if (food == "Cereal Prawn") {
                    temp[3] += this.itemsOrdered[x][y].amount;
                } else if (food == "Dry Beef Hor Fun") {
                    temp[4] += this.itemsOrdered[x][y].amount;
                } else if (food == "Prawn omelette") {
                    temp[5] += this.itemsOrdered[x][y].amount;
                }
            }
        }
        this.datacollection.datasets[0].data = temp
        console.log(this.datacollection.datasets[0].data)
        this.renderChart(this.datacollection, this.options)
      })
    }
  },
  created () {
    this.fetchItems()
  }
}