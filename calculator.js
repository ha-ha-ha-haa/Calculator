let store_var = "";
let cross = document.getElementById("cross");
let buttons = document.querySelectorAll(".show-on-area");
let point = document.getElementById("point");
let clear = document.getElementById("clear");
let store = document.getElementById("store");
let inp_area = document.getElementById("area");
let result = document.getElementById("result");
let store_clear = document.getElementById("store-clear");
let restore = document.getElementById("restore");
let increment_store = document.getElementById("increment-store");
let plus_minus = document.getElementById("plus-minus");
let one_by_x = document.getElementById("one-by-x");
const signs = ["+","-","x","/"];
let square = document.getElementById("square");
let square_root = document.getElementById("square-root");
let evaluate = document.getElementById("evaluate");

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

let square_or_root = (text, op) =>{
    var num = "";
    var temp = "";

    for (let index = text.length-1; index >= 0; index--) {
        temp = text.charAt(index);
        if (isNaN(temp) && temp != ".")
            break;
        num = temp+num;
    }
    temp = num;
    if (op == "sqrt")
        num = Math.sqrt(parseFloat(num));
    else
        num = Math.pow(parseFloat(num),2);
    text = text.substring(0, text.lastIndexOf(temp)) + num;
    return text;
    
}
buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
        var text = inp_area.value;
        if (text == "" && signs.slice(2,4).includes(e.target.innerHTML))
            return;
        else if (!(signs.includes(e.target.innerHTML)) && text.charAt(text.length-1) == 0 && text.charAt(text.length-2) == ".") 
            inp_area.value = text.replaceAt(text.length-1,e.target.innerHTML);    

        else if (!(signs.includes(text.charAt(text.length-1)) && signs.includes(e.target.innerHTML))) 
            inp_area.value += e.target.innerHTML;
    });
})

clear.addEventListener("click", (e) => {
    inp_area.value = "";
    result.value = "";
})


point.addEventListener("click", (e) => {
    text = inp_area.value;
    const myArray = text.split(/[-+x/]+/);
    if (inp_area.value != "" && !myArray[myArray.length-1].includes(".")) {
        inp_area.value += ".0";
    }
})

store.addEventListener("click", (e) => {
    var text = inp_area.value;
    var res = result.value;
    if (!(isNaN(text)))
        store_var = text;
    else if(res != "")
        store_var = res;
})

increment_store.addEventListener("click", (e) => {
        var text = inp_area.value;
        if (!(isNaN(text)))
            store_var = parseFloat(store_var) + parseFloat(text);
})
store_clear.addEventListener("click", (e) => {
    store_var = "";
})

restore.addEventListener("click", (e) => {
    inp_area.value = store_var;
})

plus_minus.addEventListener("click", (e) => {
    var num = "";
    var temp = "";
    var text = inp_area.value;
    for (let index = text.length-1; index >= -1; index--) {
        temp = text.charAt(index);
        if ((isNaN(temp) && temp != ".") || temp == "")
        {
            if (temp == "+"){
                temp = temp + num;
                num = "-"+num;
            }
            else if (temp == "-"){
                temp = temp + num;
                num = "+"+num;
            }
            else{
                temp = num;
                num = "-"+num;
            }
            break;
        }
        num = temp+num;
    }
    text = text.substring(0, text.lastIndexOf(temp)) + num;
    inp_area.value=text;
})

square.addEventListener("click", (e) => {
    var text = inp_area.value;
    if(text!= "")
    {
        inp_area.value=square_or_root(text,"square");
    }
})
square_root.addEventListener("click", (e) => {
    var text = inp_area.value;
    if(text!= "")
    {
        inp_area.value=square_or_root(text,"sqrt");
    }
})
one_by_x.addEventListener("click", (e) => {
    var num = "";
    var temp = "";
    var text = inp_area.value;
    if(text!= "")
    {
        for (let index = text.length-1; index >= 0; index--) {
            temp = text.charAt(index);
            if (isNaN(temp) && temp != ".")
                break;
            num = temp+num;
        }
        temp = num;
        num = (1/parseFloat(num)).toFixed(3);
        text = text.substring(0, text.lastIndexOf(temp)) + num;
        inp_area.value=text;
    }
})

evaluate.addEventListener("click", (e) => {
    text = inp_area.value
    if (text != "" && !isNaN(text.charAt(text.length-1))) 
        result.value = eval(text.replaceAll("x","*"));
})

cross.addEventListener("click", (e) => {
    var text = inp_area.value;
    if (text != "")
        inp_area.value = text.substring(0,text.length-1);
})