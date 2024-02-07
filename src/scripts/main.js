(function () {

    class NewSet {
        constructor (motherElement) {
            this.setBlockElement = null;
            this.setButtonElement = null;
            this.inputElements = [];
            this.motherElement = motherElement;
            this.createSetBlock();
            return [this.setBlockElement, this.inputElements];
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
                
                that.motherElement.createSetElement()
                edit.call(this);
            });
        } 

    }



    class NewExercise {
        constructor (name) {
            this.xrcsName = name;
            this.xrcsBlockElement = null;
            this.xrcsInfoLastTraining = null;
            this.xrcsSetsElement = null;
            this.inputsElements = []
            this.init()
        }
        init() {
            this.createBlock();
            this.showBlock()
        }
        createBlock () {
            this.xrcsBlockElement = document.createElement('div');
            this.xrcsBlockElement.className = 'block exercise'
            
            const xrcsInfoElement = this.createInfoElement();
            this.xrcsBlockElement.appendChild(xrcsInfoElement);
            
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

    let xrcsList = []
    
    $('#add-exercise').click(() => {
        const name = $('#xrcsName').val()
        $('#xrcsName').val('')
        if(!name) return 
        const lastXrcsBlock = xrcsList[xrcsList.length - 1];
        if(lastXrcsBlock) {
            resultCompil(lastXrcsBlock)
        }
        newXrcs = new NewExercise(name);
        xrcsList.push({name : name, element : newXrcs});
    });

    function resultCompil (lastXrcsBlock) {
        let result = {
            name : lastXrcsBlock.name,
            setsVal : []
        }
        lastXrcsBlock.element.inputsElements.forEach(item => {
            if(!item[0].value || !item[1].value) return
            result.setsVal.push({
                weight : item[0].value,
                rep : item[1].value
            });
        });
        if (result.setsVal.length === 0) {
            lastXrcsBlock.element.xrcsBlockElement.classList.add('remove')
            setTimeout(() => {
                document.getElementById('exercises').removeChild(lastXrcsBlock.element.xrcsBlockElement);
                xrcsList.remove(lastXrcsBlock)
            }, 3000)
        } else {
            lastXrcsBlock.element.close(result);
            lastXrcsBlock.result = result
            console.log(xrcsList)
        }
    }


    $('#finish').click(() => {
        const lastXrcsBlock = xrcsList[xrcsList.length - 1];
        if(lastXrcsBlock) {
            resultCompil(lastXrcsBlock)
        }
        let toLocalStorage = [];
        xrcsList.forEach(item => {
            toLocalStorage.push({
                date : new Date(),
                name : item.name,
                setsVal : item.result.setsVal
            });
            document.getElementById('exercises').removeChild(item.element.xrcsBlockElement);
        });
        console.log(toLocalStorage)
        localStorage.setItem('training', JSON.stringify(toLocalStorage));
    })
})();