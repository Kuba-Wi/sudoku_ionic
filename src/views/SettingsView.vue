<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Server address settings</ion-title>
                <ion-button fill="clear" slot="end" @click="this.$router.push('/')">
                    <ion-icon :icon="arrowBackOutline"></ion-icon>
                </ion-button>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-label stacked position="floating">IP</ion-label>
                    <ion-input ref="ipInput" type="text" v-model="ip" @change="validateIP"></ion-input>
                </ion-item>
                <ion-item>
                    <ion-label stacked position="floating">Port</ion-label>
                    <ion-input type="number" v-model="port" @change="validatePort"></ion-input>
                </ion-item>
            </ion-list>
            <!-- <ion-button id="save_button" expand="block">Save</ion-button> -->
        </ion-content>
    </ion-page>
</template>

<script>
import { arrowBackOutline } from 'ionicons/icons'
import { IonHeader, 
         IonToolbar, 
         IonIcon, 
         IonContent, 
         IonPage, 
         IonButton, 
         IonTitle, 
         IonList, 
         IonInput, 
         IonLabel, 
         IonItem } from '@ionic/vue'

export default {
    name: "SettingsView",
    components: {
        IonHeader,
        IonToolbar, 
        IonIcon, 
        IonContent, 
        IonPage, 
        IonButton,
        IonTitle,
        IonList,
        IonInput,
        IonLabel,
        IonItem
    },
    data() {
        return {
            arrowBackOutline,
            ip: this.$store.getters.IP,
            port: this.$store.getters.Port
        }
    },
    methods: {
        validateIP() {
            if (this.ip === '') {
                this.$store.dispatch('setDefaultIP')
                this.ip = this.$store.getters.IP
            } else {
                this.$store.dispatch('setIP', this.ip)
            }
        },
        validatePort() {
            if (this.port === '') {
                this.$store.dispatch('setDefaultPort')
                this.port = this.$store.getters.Port
            } else {
                this.$store.dispatch('setPort', this.port)
            }
        }
    }
}
</script>

<style scoped>
ion-icon {
    color: black
}
</style>
