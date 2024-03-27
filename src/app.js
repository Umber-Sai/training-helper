import {Exercise} from "./components/exercise.js";
import { SSKeys } from "./utils/sessionStorageKeys.js";


class App {
    constructor () {
        this.dateToday = this.getDate();
        this.exercisesElement = document.getElementById('exercises')
        this.currentXrcs = null;
        
        window.addEventListener('load', this.restoreData.bind(this));
        document.getElementById('add-exercise').addEventListener('click', this.addExerciseProcess.bind(this));
    }

    sessionStorageInit(key) {
        if(!sessionStorage.getItem(key)) {
            sessionStorage.setItem(key, JSON.stringify([]));
            console.log('session storeg inited');
        }
    }
   
    getDate () {
        const today = new Date();
        const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
        document.getElementById('date').innerText = date;
        return date
    }

    addExerciseProcess () {
        const nameExrcs = document.getElementById('xrcsName').value;
        if (nameExrcs) {
            closingCurrentXrcs.call(this);
            newCurrentXrcs.call(this);
        }

        function closingCurrentXrcs () {
            if(!this.currentXrcs) return;
            if(this.currentXrcs.checkValues()) {
                const data = this.currentXrcs.collectData();
                this.saveToSessionStorage(SSKeys.xrcsColletion, data);
                this.currentXrcs.close();
            } else {
                this.exercisesElement.removeChild(this.currentXrcs.xrcsElement)
            }
            this.currentXrcs = null;
        }

        function newCurrentXrcs () {
            const newExercise = new Exercise(nameExrcs);
            newExercise.createElement().then(element => {
                this.currentXrcs = newExercise;
                this.exercisesElement.appendChild(element)
            });
        }

        
    }

    saveToSessionStorage(key, data) {
        let xrcsCollection = JSON.parse(sessionStorage.getItem(key));
        if(!xrcsCollection) {
            this.sessionStorageInit(key);
            xrcsCollection = [];
        }
        xrcsCollection.push(data);
        sessionStorage.setItem(key, JSON.stringify(xrcsCollection));
    }

    async restoreData () {

        function restoreXrcsCollection() {
            const xrcsCollection = JSON.parse(sessionStorage.getItem(SSKeys.xrcsColletion));
            if (!xrcsCollection) {
                this.sessionStorageInit(SSKeys.xrcsColletion);
                return
            }
            console.log(xrcsCollection);
            xrcsCollection.forEach(exercise => {
                const xrcs = new Exercise(exercise.name);
                xrcs.createClosedXrcs(exercise.sets).then(element => {
                    this.exercisesElement.appendChild(element);
                })
            });
        }
        
        async function restoreCurrentXrcs() {
            const currentXrcs = JSON.parse(sessionStorage.getItem(SSKeys.currentXrcs));
            if (!currentXrcs) return
            console.log(currentXrcs);

            this.currentXrcs = new Exercise(currentXrcs.name);
            await this.currentXrcs.restoreCurrentXrcs(currentXrcs.sets).then(element => {
                this.exercisesElement.appendChild(element);
            });
        }

        restoreXrcsCollection.call(this);
        restoreCurrentXrcs.call(this);
    }




}

(new App())

