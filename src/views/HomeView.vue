<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <SudokuInput ref="inputBoard"/>
      <div id="buttons_container">
        <ion-button id="solve_btn" @click="solve">Solve</ion-button>
        <ion-button @click="scanPhoto">Scan photo</ion-button>
        <ion-button @click="clear">Clear</ion-button>
      </div>
      <LoadingAnim v-if="showLoading" />
      <SudokuResult ref="resultBoard" v-show="showResult"/>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonContent, IonPage, IonButton } from '@ionic/vue'
import { Camera, CameraResultType } from '@capacitor/camera'

import SudokuInput from '../components/SudokuInput.vue'
import SudokuResult from '../components/SudokuResult.vue'
import LoadingAnim from '../components/LoadingAnim.vue'

import Solver from '../classes/sudokuSolver.js'

export default {
  name: 'HomeView',
  components: {
    IonContent,
    IonPage,
    IonButton,
    SudokuInput,
    SudokuResult,
    LoadingAnim
  },
  data() {
    return {
      showResult: false,
      showLoading: false
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
    async scanPhoto() {
      try {
        var image = await Camera.getPhoto({
          resultType: CameraResultType.Uri,
          quality: 50,
          allowEditing: true,
          width: 1000,
          height: 1000,
          correctOrientation: false
        })
      } catch (err) {
        return
      }

      const blob = await fetch(image.webPath).then(r => r.blob())
      var formData = new FormData()
      formData.append("image", blob)
      this.showLoading = true
      setTimeout(() => fetchController.abort(), 5000)

      try {
        var fetchController = new AbortController()
        const res_promise = await fetch("http://192.168.1.14:5000/process_image", {
          method: "POST",
          body: formData,
          signal: fetchController.signal
        })

        var response = await res_promise.json()
        this.$refs.inputBoard.fillInputCells(response.result)
      } catch (err) {
        alert("Failed to connect with the server")
      }
      this.showLoading = false
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
