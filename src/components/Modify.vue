<template>
  <div>
    <ul>
        <li v-for="(item, index) in this.datapacket" :key="index"> 
            <label> {{item.name}}: {{item.amount}} </label><br>
            <input id="index" placeholder=0 type="number" min="0" v-model="item.amount"><br>
        </li>
    </ul>
    <button v-on:click="updateOrder">Update Order</button>
  </div>
</template>

<script>
import db from "../firebase.js"
export default {
    data() {
        return {
            defaultMenu: [],
            datapacket: [],
            updatedDatapacket: [],
        }
    },
    props: {
        id: {
            type: String
        }
    },
    methods: {
        fetchItems: function() {
            //Store all menu in defaultMenu
            db.collection('menu').get().then(snapshot => {
                snapshot.docs.forEach(doc => {
                    this.defaultMenu.push(doc.data())
                });
            });
            //Store the datapacket
            db.collection('orders').doc(this.id).get().then(snapshot => {
                var item = snapshot.data().item
                this.datapacket = item
                this.completeData()
                console.log(this.datapacket)
            });
        },
        completeData: function() {
            for (let i = 0; i < this.defaultMenu.length; i++) {
                var isOrdered = false;
                for (let j = 0; j < this.datapacket.length; j++) {
                    if (this.defaultMenu[i].name === this.datapacket[j].name) {
                        isOrdered = true;
                        this.updatedDatapacket.push({
                            name: this.datapacket[j].name,
                            amount: 0,
                            price: this.datapacket[j].price,
                        })
                    }
                }
                if (!isOrdered) {
                    this.datapacket.splice(i, 0, {
                        name: this.defaultMenu[i].name,
                        amount: 0,
                        price: this.defaultMenu[i].price,
                    });
                    this.updatedDatapacket.splice(i, 0, {
                        name: this.defaultMenu[i].name,
                        amount: 0,
                        price: this.defaultMenu[i].price,
                    })
                }
            }
        },
        updateOrder: function() {
            db.collection('orders').doc(this.id).update({
                item: this.datapacket
            }).then(this.$router.push({ path: '/orders'}));
        }
    },
    created() {
        this.fetchItems()
    }
}
</script>

<style scoped>
    .modify {
        text-align: left;
        margin: 10px;
    }
    ul {
        
        list-style-type: none;
        padding: 0;
    }
    li {
        font-size : 20px;
        margin-top: 20px
    }
    input {
        height: 30px;
        width: 300px;
        font-size: 20px
    }
    button {
        width: 200px;
        height: 70px;
        background-color: #f7cac9;
        border-radius: 10px;
        border-width: 1px;
        font-size: 20px;
    }
</style>