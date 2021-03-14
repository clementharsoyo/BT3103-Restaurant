<template>
    <div>
        <p style="font-size: 24px"> Menu Ordered: </p>
        <ul style="list-style-type: circle" v-for="item in itemsInBasket" :key="item.name">
            <li>{{item[0]}} x {{item[1]}}</li>
        </ul>
        <button v-on:click="findTotal(); sendOrders();"> Calculate Total </button>
        <p v-show="this.show"> Subtotal: {{this.showCurrentPrice}} </p>
        <p v-show="this.show"> Grandtotal: {{this.showGrandTotal}} </p>
    </div>
</template>

<script>
import db from "../firebase.js"
export default {
    name: 'Basket',
    data () {
        return {
            currentPrice: 0,
            show: false,
        }
    },
    props: {
        itemsInBasket: {
            type: Array
        }
    },
    methods: {
        findTotal: function () {
            var total = 0;
            for (let i = 0; i < this.itemsInBasket.length; i++) {
                total = total + (this.itemsInBasket[i][1] * this.itemsInBasket[i][2]);
            }
            this.currentPrice = total;
            this.show = true;
        },
        sendOrders: function() {
            var toBeSent = [];
            for (let x = 0; x < this.itemsInBasket.length; x++) {
                toBeSent.push({
                    name: this.itemsInBasket[x][0],
                    amount: this.itemsInBasket[x][1],
                    price: this.itemsInBasket[x][2]
                    })
            }
            db.collection("orders").add({item: toBeSent}).then(() => location.reload())
        }
    },
    computed: {
        showCurrentPrice: function() {
            return this.currentPrice;
        },
        showGrandTotal: function() {
            return ((this.currentPrice * 1.07).toFixed(2));
        }
    }
}
</script>

<style scoped>
button {
    background-color: goldenrod;
    font-size: 18px;
}
</style>