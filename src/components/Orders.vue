<template>
    <div>
        <ul>
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul id="itemsList">
            <li v-for="item in this.itemsOrdered" :key="item.id" id="menuList">
                <div><button v-bind:id="item[0]" v-on:click="deleteItems($event)"> Delete </button></div>
                <div><button v-bind:id="item[0]" v-on:click="route($event)"> Modify </button></div>
                <p v-for="food in item[1]" :key="food.name">
                    {{food.name}} : {{food.amount}}
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
import db from '../firebase.js'
export default {
    data() {
        return {
            itemsOrdered: [],
            defaultMenu: [],
        }
    },
    methods: {
        fetchItems : function() {
            //Store all menu in defaultMenu
            db.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.defaultMenu.push(doc.data())
                });
            });
            //Store the ordered items in items
            db.collection('orders').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    var item = [doc.id, doc.data().item]
                    this.itemsOrdered.push(item)
                    this.verifyData()
                });
            });
        },
        verifyData: function() {
            //All orders
            for (let i = 0; i < this.itemsOrdered.length; i++) {
                //Each order
                for (let j = 0; j < this.defaultMenu.length; j++) {
                    var ordered = 0
                    //Each items
                    for (let k = 0; k < this.itemsOrdered[i][1].length; k++) {
                        if (this.defaultMenu[j].name == this.itemsOrdered[i][1][k].name) {
                            ordered = 1
                        }
                    }
                    if (ordered == 0) {
                        //Put on menu as count 0 in the items ordered
                        this.itemsOrdered[i][1].splice(j,0,{
                            name: this.defaultMenu[j].name,
                            amount: 0,
                            price: this.defaultMenu[j].price,
                        });
                    }
                }
            }
        },
        deleteItems: function(event) {
            let id = event.target.getAttribute("id");
            db.collection('orders').doc(id).delete().then(() => {location.reload()});
        },
        route: function(event) {
            console.log(event.target.getAttribute("id"))
            this.$router.push({name: 'Modify', params: {id: event.target.getAttribute("id")}});
        }
    },
    created() {
        this.fetchItems()
    }
    
}
</script>

<style scoped>
#itemsList {
  width: 100%;
  max-width: 100%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
#menuList {
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}

button {
  width: 65px;
  height: 30px;
  background-color: #f7cac9;
  border-radius: 10px;
  border-width: 1px;
}
</style>