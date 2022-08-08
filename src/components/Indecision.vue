<template>
  <img v-show='img' :src="img" alt="background">
  <div class="bg-dark"></div>

  <div class="indecision-container">
    <input
      type="text"
      name="question"
      id="question"
      placeholder="Realiza una pregunta"
      v-model="question"
    />
    <p>Recuerda terminar con un signo de interrogación (?)</p>

    <div v-show="isValidQuestion">
      <h2>{{ question }}</h2>
      <h1>{{ answer }}</h1>
    </div>
  </div>


</template>

<script>
export default {
  name: 'Indecision',
  data() {
    return {
      answer: '',
      img: null,
      isValidQuestion: false,
      question: '',
    }
  },
  methods: {
    async getResponse() {

      try {
        this.answer = 'Pensando . . .'
  
        const { answer, image } = await fetch('https://yesno.wtf/api')
          .then(response => response.json())
  
        switch (answer) {
          case 'yes':
            this.answer = '¡Si!'
            break;
          
          case 'no':
            this.answer = '¡No!'
            break;
        
          default:
            this.answer = 'Tal vez'
            break;
        }
  
        this.img = image
      } catch (error) {
        
        this.img = null
        this.answer = 'No se encontró respuesta'

      }
  
    }
  },
  watch: {
    question(value, oldValue) {
      
      this.isValidQuestion = false

      console.log({ value })

      if(!value.endsWith('?')) return

      this.isValidQuestion = true
      this.getResponse()
      
    } 
  }
}
</script>

<style scoped>
  img, .bg-dark {
    height: 100vh;
    left: 0px;
    max-height: 100%;
    max-width: 100%;
    position: fixed;
    top: 0px;
    width: 100vw;
  }

  .bg-dark {
    background-color: rgba(0, 0, 0, 0.4);
  }

  .indecision-container {
    position: relative;
    z-index: 99;
  }
  
  input {
    width: 250px;
    padding: 10px 15px;
    border-radius: 5px;
    border: none;
  }
  input:focus {
    outline: none;
  }

  p {
    color: white;
    font-size: 20px;
    margin-top: 0px;
  }

  h1, h2 {
    color: white;
  }
  
  h2 {
    margin-top: 150px;
  }

</style>