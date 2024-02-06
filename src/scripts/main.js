(function () {
    class NewSet {
        constructor (motherBlock) {
            this.setBlockElement = null;
            this.setButtonElement = null;
            this.inputElements = [];
            this.motherBlock = motherBlock;
            this.createSetBlock();
            return this.setBlockElement;
        }
        createSetBlock () {
            const that = this;
            this.setBlockElement = document.createElement('div');
            this.setBlockElement.className = 'new_set';

            const setPointElement = document.createElement('div');
            setPointElement.className = 'set-point'
            this.setBlockElement.appendChild(setPointElement);

            for (let i = 0; i < 2; i++) {
                const labelElement = document.createElement('label');
                labelElement.className = (i === 0? "weight" : "repeats");

                const inputElement = document.createElement('input');
                inputElement.setAttribute('type', 'number');
                i === 0 ? this.weigntValidation(inputElement) : this.repValidation(inputElement);
                this.inputElements.push(inputElement);

                const textElement = document.createElement('span');
                textElement.innerText = (i === 0? "kg" : "rep")

                labelElement.appendChild(inputElement);
                labelElement.appendChild(textElement);
                this.setBlockElement.appendChild(labelElement);
            }

            const setButtonElement = document.createElement('div');
            setButtonElement.className = 'btn add';
            setButtonElement.innerText = '+';
            this.addBtnLogic(setButtonElement);
            

            this.setButtonElement = setButtonElement;
            this.setBlockElement.appendChild(this.setButtonElement);
        }  
        weigntValidation (input) {
            input.addEventListener('input', (event) => {
                const val = event.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
                event.target.value = !val[2] ? val[1] : val[1] + '.' + val[2];
            })
        }
        repValidation (input) {
            input.addEventListener('input', (event) => {
                const val = event.target.value.replace(/\D/g, '').match(/(\d{0,2})/);
                event.target.value = val[1];

            })
        }
        addBtnLogic (element) {
            const that = this;
            element.addEventListener('click', function add () {
                if(!that.inputElements[0].value || !that.inputElements[1].value) {
                    console.log('empty val')
                    return
                }
                this.removeEventListener('click', add);
                this.addEventListener('click', edit);

                function submit () {
                    that.setButtonElement.innerText = 'sbmt';
                    that.inputElements.forEach( input => {
                        input.removeAttribute('disabled');
                    });
                    this.removeEventListener('click', submit);
                    this.addEventListener('click', edit)
                }

                function edit () {
                    if(!that.inputElements[0].value || !that.inputElements[1].value) {
                        console.log('empty val')
                        return
                    }
                    that.setButtonElement.innerText = 'edit';
                    that.inputElements.forEach( input => {
                        input.setAttribute('disabled', 'disabled');
                    })
                    this.removeEventListener('click', edit);
                    this.addEventListener('click', submit);
                }
                
                that.motherBlock.appendChild(new NewSet(that.motherBlock));
                edit.call(this);
            });
        } 

    }



    const NewExercise = {
        xrcsName : null,
        xrcsBlockElement : null,
        init() {
            this.xrcsName = document.getElementById('xrcsName').value;
            this.createBlock();
            
            
            
        },


        createBlock () {
            const motherBlockElement = document.getElementById('exercises');

            this.xrcsBlockElement = document.createElement('div');
            this.xrcsBlockElement.className = 'block exercise'
            
            const xrcsInfoElement = this.createInfoElemet();
            this.xrcsBlockElement.appendChild(xrcsInfoElement);
            
            motherBlockElement.appendChild(this.xrcsBlockElement)

            this.createSetsElement();
        },


        createSetsElement () {
            const xrcsSetsElement = document.createElement('div');
            xrcsSetsElement.className = 'exercise__sets'

            const xrcsSetElement = new NewSet(xrcsSetsElement);
            xrcsSetsElement.appendChild(xrcsSetElement)

            this.xrcsBlockElement.appendChild(xrcsSetsElement)
        },


        createInfoElemet () {
            const xrcsInfoElement = document.createElement('div');
            xrcsInfoElement.className = 'exercies__info';

            const xrcsInfoNameElement = document.createElement('div');
            xrcsInfoNameElement.className = 'name';
            xrcsInfoNameElement.innerText = this.xrcsName + ':';

            //create "last_training"

            xrcsInfoElement.appendChild(xrcsInfoNameElement);
            return xrcsInfoElement;

        },
        showBlock () {
        }
    }

    $('#add-exercise').click(() => {
        if($('#xrcsName').val()) {

            NewExercise.init()
        }
    })
})();