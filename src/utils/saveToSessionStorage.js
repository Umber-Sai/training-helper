export class CheckPoint {
    constructor (name, weight, repeats) {
        this.exercise = {
            name : name,
            sets : [
                {
                    weight : weight,
                    repeats : repeats
                }
            ]
        }
        this.data = JSON.parse(sessionStorage.getItem('exercises'));
        data.push(exercise);
        sessionStorage.setItem('exercises', JSON.stringify(data));
    }

    createData () {
        const item = {
            name : this.name,
            sets : [this.values]
        }
        return [item];
    }

    changeData () {
        console.log('changing data')
        console.log(this.data)
        let [xrcsData, index] = this.data.find((item, index) => {
            if(item.name === this.name) {
                return [item, index]
            }
        });
        if(xrcsData.sets[this.setId]) {
            xrcsData.sets[this.setId] = this.values
        } else {
            xrcsData.sets.push(this.values)
        }
        return this.data[index] = xrcsData
    }
}