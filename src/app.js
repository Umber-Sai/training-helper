import {Exercise} from "./components/exercise.js";


class App {
    constructor () {
        this.dateToday = this.getDate();
        this.exercisesElement = document.getElementById('exercises')
        this.exerciseList = []

        this.sessionStorageInit();
        document.getElementById('add-exercise').addEventListener('click', this.addExercise.bind(this));

        
        
    }

    sessionStorageInit() {
        if(!sessionStorage.getItem('exercises')) {
            sessionStorage.setItem('exercises', JSON.stringify([]));
            console.log('session storeg inited');
        }
    }
   
    getDate () {
        const today = new Date();
        const date = `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`
        document.getElementById('date').innerText = date;
        return date
    }

    addExercise () {
        if(this.exerciseList.length > 0) {
            const lastElement = this.exerciseList[this.exerciseList.length - 1];
            if(lastElement.checkValues()) {
                lastElement.close()
            } else {
                this.exercisesElement.removeChild(lastElement.xrcsElement)
            }
        }

        const nameExrcs = document.getElementById('xrcsName').value;
        if (nameExrcs) {
            const newExercise = new Exercise(nameExrcs);
            newExercise.getTemplate().then(template => {
                this.exerciseList.push(newExercise);
                this.exercisesElement.appendChild(template)
            })
        }
    }



}

(new App())