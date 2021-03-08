class InputsApp{
    input1:HTMLInputElement;
    input2:HTMLInputElement;
    input3:HTMLInputElement;
    input4:HTMLInputElement;
    sum:HTMLInputElement;
    avg:HTMLInputElement;
    min:HTMLInputElement;
    max:HTMLInputElement;
    constructor(){
        this.startApp();
    }
    startApp(){
        this.inputsValues();
        this.result();
    }
    inputsValues() {
        
        this.input1 = document.querySelector(`#input1`);
        this.input2 = document.querySelector(`#input2`);
        this.input3 = document.querySelector(`#input3`);
        this.input4 = document.querySelector(`#input4`);
        this.sum = document.querySelector(`#sum`)
    }
    updateValues(){
        //var value1 = +this.input1.addEventListener("input")
    }
    convertToInt(){
        var value1 = parseInt(this.input1.value);
        var value2 = parseInt(this.input2.value);
        var value3 = parseInt(this.input3.value);
        var value4 = parseInt(this.input4.value);
    }
    result(){
        
        //var xD = parseInt(this.input1.value)
        this.sum = parseInt(this.input1.value) + parseInt(this.input2.value)
        var xD = document.querySelector(`#sum`)
        xD.value
        document.querySelector(`#sum`).value = this.sum.toString()
        console.log("noooooo: "+document.querySelector(`#sum`).innerHTML)
        console.log(document.querySelector(`#sum`))
        //console.log(this.sum)
    }
    
}
const startApp = new InputsApp();