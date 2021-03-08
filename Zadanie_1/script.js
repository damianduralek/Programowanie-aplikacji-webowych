var InputsApp = /** @class */ (function () {
    function InputsApp() {
        this.startApp();
    }
    InputsApp.prototype.startApp = function () {
        this.inputsValues();
        this.result();
    };
    InputsApp.prototype.inputsValues = function () {
        this.input1 = document.querySelector("#input1");
        this.input2 = document.querySelector("#input2");
        this.input3 = document.querySelector("#input3");
        this.input4 = document.querySelector("#input4");
    };
    InputsApp.prototype.updateValues = function () {
        //var value1 = +this.input1.addEventListener("input")
    };
    InputsApp.prototype.convertToInt = function () {
        var value1 = parseInt(this.input1.value);
        var value2 = parseInt(this.input2.value);
        var value3 = parseInt(this.input3.value);
        var value4 = parseInt(this.input4.value);
    };
    InputsApp.prototype.result = function () {
        //var xD = parseInt(this.input1.value)
        this.sum = parseInt(this.input1.value) + parseInt(this.input2.value);
        document.querySelector("#sum").innerHTML = this.sum.toString();
        console.log("noooooo: " + document.querySelector("#sum").innerHTML);
        console.log(document.querySelector("#sum"));
        //console.log(this.sum)
    };
    return InputsApp;
}());
var startApp = new InputsApp();
