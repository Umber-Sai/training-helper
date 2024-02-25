class Exercise {
    constructor (name) {
        this.xrcsName = name;
        this.xrcsBlockElement = null;
        this.xrcsInfoLastTraining = null;
        this.xrcsSetsElement = null;
        this.inputsElements = []
        this.init()

        this.element = this.createBlock();
    }
    init() {
        this.createBlock();
        this.showBlock()
    }
    createBlock () {
        const xrcsBlockElement = document.createElement('div');
        xrcsBlockElement.className = 'block exercise'
        
        const xrcsInfoElement = this.createInfoElement();
        xrcsBlockElement.appendChild(xrcsInfoElement);
        
        this.xrcsSetsElement = document.createElement('div');
        this.xrcsSetsElement.className = 'exercise__sets';
        this.xrcsBlockElement.appendChild(this.xrcsSetsElement);

        this.createSetElement();
        
    }
    createInfoElement () {
        const xrcsInfoElement = document.createElement('div');
        xrcsInfoElement.className = 'exercies__info';

        const xrcsInfoNameElement = document.createElement('div');
        xrcsInfoNameElement.className = 'name';
        xrcsInfoNameElement.innerText = this.xrcsName + ':';

        //create "last_training"
        this.xrcsInfoLastTraining = document.createElement('div');
        this.xrcsInfoLastTraining.className = 'last_training';

        xrcsInfoElement.appendChild(xrcsInfoNameElement);
        xrcsInfoElement.appendChild(this.xrcsInfoLastTraining);
        return xrcsInfoElement;
    }
    createSetElement () {
        const [xrcsSetElement, inputElemets] = new NewSet(this);
        this.inputsElements.push(inputElemets);
        this.xrcsSetsElement.appendChild(xrcsSetElement);
    }
    showBlock () {
        const motherBlockElement = document.getElementById('exercises');
        motherBlockElement.appendChild(this.xrcsBlockElement)
        
    }
    close(result) {
        this.xrcsInfoLastTraining.innerHTML = '';
        result.setsVal.forEach( set => {
            const row = document.createElement('div');
            const text = `${set.weight} kg/${set.rep} repearts`;
            row.innerText = text;
            this.xrcsInfoLastTraining.appendChild(row);
        })
        this.xrcsBlockElement.removeChild(this.xrcsSetsElement)
    }
}