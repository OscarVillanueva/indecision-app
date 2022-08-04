<template>
  <h2>{{ customTitle }}</h2>
  <p>{{ counter }} <sup>2</sup> = {{ counterPow }}</p>
  <div>
    <button
      class="mr-2"
      @click = 'addToCounter'
    >
      add
    </button>

    <button
      v-on:click = 'subToCounter'
    >
      sub
    </button>
  </div>
</template>

<script>
export default {
  // props: ['title'],
  props: {
    // Title es opcional
    title: String,
    start: {
      type: Number,
      // required: true,
      default: 0,
      validator(value) {
        return value > 10
      }
    }
  },
  name: 'Counter',
  data(){
    return {
      counter: this.start,
    }
  },
  computed: {
    counterPow() {
      return this.counter * this.counter
    },
    customTitle() {
      return this.title || 'Counter'
    }
  },
  methods: {
    addToCounter() {
      this.counter = this.counter + 1;
    },
    subToCounter() {
      this.counter = Math.max(0, this.counter - 1)
    },
  }
}
</script>

<style scoped>

  .mr-2 {
    margin-right: 1rem;
  }

  button {
    padding: 0.5rem 2rem;
    text-transform: uppercase;
    border: none;
    border-radius: 0.5rem;
    background-color: cornflowerblue;
    color: white;
  }
</style>
