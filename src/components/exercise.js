import { SSKeys } from "../utils/sessionStorageKeys.js";
import { Set } from "./set.js";

export class Exercise {
    constructor (name) {
        this.xrcsName = name;

        this.xrcsElement = null;
        this.xrcsSets = null;
        this.xrcsInfo = null;

        this.setList = [];
    }


    async createElement () {
        await this.getTemplate();

        await this.addInfo();
        await this.addSet();

        return this.xrcsElement
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

        this.xrcsElement = template;
        this.xrcsInfo = elInfo;
        this.xrcsSets = elSets;

        elName.innerText = this.xrcsName + ':';
        return this.xrcsElement;
    }

    async addInfo() {
        this.xrcsInfo.innerHTML = ''
    }

    async addSet() {
        const newSet = new Set(this, this.setList.length);
        await newSet.createElement().then(element => {
            this.xrcsSets.appendChild(element);
            this.setList.push(newSet);
        });
    }

    checkValues () {
        return this.setList[0].inputWeight.value && this.setList[0].inputRepeats.value;
    }

    saveCurrentXrcs () {
        const data = this.collectData();
        sessionStorage.setItem(SSKeys.currentXrcs, JSON.stringify(data));
        
    }

    collectData() {
        const data = {
            name : this.xrcsName,
            sets : []
        }
        this.setList.forEach(set => {
            if(set.inputWeight.value && set.inputRepeats.value){
                data.sets.push({
                    weight : set.inputWeight.value,
                    repeats : set.inputRepeats.value
                });
            }
        });
        return data;
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

    async createClosedXrcs (data) {
        await this.getTemplate();

        data.forEach(set => {
            const div = document.createElement('div');
            div.innerText = `${set.weight} kg / ${set.repeats} rep`;
            this.xrcsSets.appendChild(div);
        })

        return this.xrcsElement;
    }

    async restoreCurrentXrcs (data) {
        await this.getTemplate();

        const that = this;
        await data.forEach( async set => {
            const restoredSet = new Set(that, that.setList.length);
            await restoredSet.restoreSet(set).then(element => {
                this.xrcsSets.appendChild(element);
                this.setList.push(restoredSet);
            });
        });

        const openSet = new Set(that, that.setList.length);
        await openSet.createElement().then(element => {
            this.xrcsSets.appendChild(element);
            this.setList.push(openSet);
        });

        return this.xrcsElement;
    }
}