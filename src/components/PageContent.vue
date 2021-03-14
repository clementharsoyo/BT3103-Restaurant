<template>
    <div>
        <ul id="itemsList">
            <li><router-link to="/" exact>Home</router-link></li>
            <li><router-link to="/orders" exact>Orders</router-link></li>
            <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
        <ul id="itemsList">
            <li v-for="item in this.items" :key="item.id" id="menuList">
                <p id="itemName">{{item.name}}</p>
                <img v-bind:src="item.imageURL" />
                <p id="price">${{item.price}}</p>
                <Counter v-bind:itemPassed = item v-on:counter="onCounter"></Counter>
            </li>
        </ul>
        <Basket id="shoppingBasket" v-bind:itemsInBasket = "itemsSelected"></Basket>
    </div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"

  export default {
    name: 'PageContent',
    props: {
      listOfItems: {
        type: Array
      }
    },
    data () {
        return {
            itemsSelected: [],
            items: [],
        }
    },
    methods: {
        onCounter: function (item, count) {
            if (this.itemsSelected.length === 0 && count > 0) {
                //If there is nothing in items selected, push the ORDER in
                this.itemsSelected.push([item.name, count, item.price]);
            } else {
                // Loop through everything to check what is not in the basket
                var cont = 0;
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];
                    //Updating value of count
                    if (item_name == item.name && count > 0) {
                        this.itemsSelected.splice(i, 1, [item.name, count, item.price])
                        cont = 1;
                    }
                    //Deleting items when count is 0
                    if (item_name == item.name && count == 0) {
                        this.itemsSelected.splice(i, 1);
                        cont = 1;
                    }

                // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected

                // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.

                // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
                }
                if (cont === 0) {
                    this.itemsSelected.push([item.name, count, item.price]);
                }
            }
        },
        fetchItems: function() {
          database.collection('menu').get().then(snapshot => {
            snapshot.docs.forEach(doc => {
              this.items.push(doc.data())
            });
          });
        }
    },
    created () {
      this.fetchItems();
    },
    components: {
    Counter: QuantityCounter,
    Basket: Basket
    },
  }
</script>

<style>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
#menuList {
  flex-grow: 1;
  flex-basis: 200px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 105px;
  height: 105px;
}

#price {
  font-size: 20px;
}

#itemName {
  font-size: 20px;
}

#shoppingBasket {
  position: absolute;
  top: 23%;
  left: 78%;
}
</style>
