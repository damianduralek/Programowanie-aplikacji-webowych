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

    }
    inputsValues() {
        this.input1 = document.querySelector(`#input1`);
        this.input2 = document.querySelector(`#input1`);
        this.input3 = document.querySelector(`#input1`);
        this.input4 = document.querySelector(`#input1`);
    }
}