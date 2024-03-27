

export class Set {
    constructor (motherElement, selfId) {
        this.motherElement = motherElement;
        this.selfId = selfId;
        this.element = null;
        this.inputRepeats = null;
        this.inputWeight = null;
        this.button = null;
    }

    async createElement () {
        await this.getTemplate();

        const that = this;
        this.button.addEventListener('click', function add () {
            if (!that.inputRepeats.value && !that.inputRepeats.value) return;
            that.motherElement.saveCurrentXrcs();
            this.removeEventListener('click', add);
            that.motherElement.addSet();
            this.innerText = 'edit';

            that.inputRepeats.setAttribute('disabled', 'disabled');
            that.inputWeight.setAttribute('disabled', 'disabled');

            that.btnProcces();
        });
        
        return this.element;
    }

    async getTemplate() {
        const [
            template,
            inputWeight,
            inputRepeats,
            button
        ] = await fetch('./views/set.html')
            .then(response => response.text())
            .then(text => {
                const dom = new DOMParser().parseFromString(text, "text/html");
                return [
                    dom.getElementsByClassName('set')[0],
                    dom.getElementsByName('weight')[0],
                    dom.getElementsByName('repeats')[0],
                    dom.getElementsByClassName('add_set')[0]
                ];

            });

        this.element = template
        this.inputRepeats = inputRepeats;
        this.inputWeight = inputWeight;
        this.button = button;

        this.validation();
    }

    validation () {
        this.inputRepeats.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });

        this.inputWeight.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/\D/g, '');
        });
    }

    btnProcces() {
        const that = this
        this.button.addEventListener('click', edit);

        function edit () {
            this.innerText = 'submit';
            that.inputRepeats.removeAttribute('disabled');
            that.inputWeight.removeAttribute('disabled');


            this.removeEventListener('click', edit);
            this.addEventListener('click', submit);
        }

        function submit () {
            this.innerText = 'edit';
            console.log(that)
            that.motherElement.saveCurrentXrcs();
            that.inputRepeats.setAttribute('disabled', 'disabled');
            that.inputWeight.setAttribute('disabled', 'disabled');
            

            this.removeEventListener('click', submit);
            this.addEventListener('click', edit);
        }
    }

    async restoreSet (setVal) {
        console.log(setVal)

        await this.getTemplate();

        this.button.innerText = 'edit'
        this.inputRepeats.value = setVal.repeats;
        this.inputWeight.value = setVal.weight;
        this.inputRepeats.setAttribute('disabled', 'disabled');
        this.inputWeight.setAttribute('disabled', 'disabled');

        this.btnProcces();

        return this.element;
    }

 

}


