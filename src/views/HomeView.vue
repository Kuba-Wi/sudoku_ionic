<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <SudokuInput ref="inputBoard"/>
      <div id="buttons_container">
        <ion-button id="solve_btn" @click="solve">Solve</ion-button>
        <ion-button @click="scan">Scan photo</ion-button>
        <!-- <input id="file_input" type="file" style="display:none"> -->
        <ion-button @click="clear">Clear</ion-button>
      </div>
      <SudokuResult ref="resultBoard" v-show="showResult"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonButton } from '@ionic/vue';

import SudokuInput from '../components/SudokuInput.vue'
import SudokuResult from '../components/SudokuResult.vue'

import Solver from '../classes/sudokuSolver.js'

export default {
  name: 'HomeView',
  components: {
    IonContent,
    IonPage,
    IonButton,
    SudokuInput,
    SudokuResult
  },
  data() {
    return {
      showResult: false
    }
  },
  methods: {
    clear() {
      this.showResult = false
      this.$refs.inputBoard.clear()
    },
    solve() {
      this.showResult = false
      let solver = new Solver(this.$refs.inputBoard.input_values)
      if (solver.solve()) {
        this.showResult = true
        this.$refs.resultBoard.fillBoardValues(solver.sudokuBoard)
      } else {
        window.alert("Wrong input. Can't solve")
      }
    },
    scan() {
    }
  }
}
</script>

<style scoped>
#buttons_container {
  text-align: center;
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
