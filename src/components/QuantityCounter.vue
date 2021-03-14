<template>
    <div>
        <button v-on:click="decreaseCount">-</button>
        <p style="display: inline-block; font-size: 20px"> {{showCurrentCount}} </p>
        <button v-on:click="increaseCount">+</button>
    </div>
</template>

<script>
export default {
    name: 'QuantityCounter',
    data () {
        return {
            countValue: 0,
        }
    },
    props: {
        itemPassed: {
            type: Object
        }
    },
    methods: {
        increaseCount: function () {
            (this.countValue < 10) ? this.countValue++ : alert("You cannot buy more than 10 items");
            this.$emit('counter', this.itemPassed, this.countValue)
        },
        decreaseCount: function () {
            (this.countValue > 0) ? this.countValue-- : "";
            this.$emit('counter', this.itemPassed, this.countValue)
        },
    },
    computed: {
        showCurrentCount: function () {
            return this.countValue
        }
    }
}
</script>

<style scoped>
button {
    background-color: #FFB6C1;
    font-size: 24px;
    padding: 15px 32px;
    margin-right: 15px;
    margin-left: 15px;
}
</style>