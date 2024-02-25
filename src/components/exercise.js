import { Set } from "./set.js";

export class Exercise {
    constructor (name) {
        this.xrcsName = name;
        this.xrcsElement = null;
        this.xrcsSets = null;
        this.setList = [];

        
    }

    async getTemplate () {
        const [template, elName, elInfo, elSets] = await fetch('./views/exercise.html')
            .then(response => response.text())
            .then(text => {
                const dom = new DOMParser().parseFromString(text, "text/html");
                return [
                    dom.getElementsByClassName('exercise')[0],
                    dom.getElementById('name'),
                    dom.getElementById('info'),
                    dom.getElementById('sets')
                ];
            });

        elName.innerText = this.xrcsName + ':';
        elInfo.innerHTML = this.getInfo();
        
        this.xrcsSets = elSets;
        this.xrcsElement = template;
        
        this.addSet();

        return template
    } 

    getInfo() {
        return '';
    }

    addSet() {
        const newSet = new Set(this, this.setList.length);
        newSet.getTemplate().then(template => {
            this.xrcsSets.appendChild(template);
            this.setList.push(newSet);
        })
    }

    checkValues () {
        return this.setList[0].inputWeight.value && this.setList[0].inputRepeats.value;
    }

    close() {
        this.xrcsSets.innerHTML = '';
        this.setList.forEach(set => {
            if(set.inputWeight.value && set.inputRepeats.value) {
                const div = document.createElement('div');
                div.innerText = `${set.inputWeight.value} kg / ${set.inputRepeats.value} rep`;
                this.xrcsSets.appendChild(div);
            }
        });
    }
}