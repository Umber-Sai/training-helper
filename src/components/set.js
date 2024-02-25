import { CheckPoint } from "../utils/saveToSessionStorage.js";

export class Set {
    constructor (motherElement, selfId) {
        this.motherElement = motherElement;
        this.selfId = selfId;
        this.element = null;
        this.inputRepeats = null;
        this.inputWeight = null;
        this.button = null;
        this.checkPoint = null;
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

        const that = this;
        this.button.addEventListener('click', function add () {
            this.removeEventListener('click', add);
            that.motherElement.addSet();
            this.innerText = 'edit';

            that.inputRepeats.setAttribute('disabled', 'disabled');
            that.inputWeight.setAttribute('disabled', 'disabled');

            that.btnProcces();
        });
        
        return template;
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
            console.log(sessionStorage);
            this.innerText = 'edit';
            that.inputRepeats.setAttribute('disabled', 'disabled');
            that.inputWeight.setAttribute('disabled', 'disabled');
            

            this.removeEventListener('click', submit);
            this.addEventListener('click', edit);
        }
    }

}



let SSExample = [
    {
        name : 'banch press',
        sets : [
            {
                weight : 10,
                repeats : 15
            },
            {
                weight : 10,
                repeats : 15
            },
            {
                weight : 10,
                repeats : 15
            }
        ]
    }
]