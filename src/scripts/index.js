import { Exercise } from "./exercise.js";

let exerciseQuery = {
    exercises : [],
    motherBlock : document.getElementById('exercises'),
    init () {
        const name = document.getElementById('xrcsName').value;
        if (!name) return
        console.log(this)
        this.exercises.push({
            name : name,
            element : new Exercise(name)
        });
    },

    revealExercises () {
        this.motherBlock.innerHTML = '';
        this.exercises.forEach(item => {
            console.log(item)
        })
    }
}


document.getElementById('add-exercise').addEventListener('click', exerciseQuery.init)