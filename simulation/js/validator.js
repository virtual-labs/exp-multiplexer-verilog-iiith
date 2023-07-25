import { getBoxOrder } from "./main.js";
export function isFilled() {
    // checking verilog module
    let moduleName = document.getElementById("module-name");
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let input3 = document.getElementById("input3-selector");
    let output = document.getElementById("output-selector");
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    let RHS1LEFT = document.getElementById("RHS1LEFT-selector");
    let RHS1OPERATOR = document.getElementById("RHS1OPERATOR-selector");
    let RHS1RIGHT = document.getElementById("RHS1RIGHT-selector");
    let RHS2LEFT = document.getElementById("RHS2LEFT-selector");
    let RHS2OPERATOR = document.getElementById("RHS2OPERATOR-selector");
    let RHS2RIGHT = document.getElementById("RHS2RIGHT-selector");
    let error = "Highlighted part of the code is incomplete."
    if (moduleName.value.trim() == '') {
        printErrors(error, moduleName);
        return false;
    }
    if (input1.value === "") {
        printErrors(error, input1);
        return false;
    }
    if (input2.value === "") {
        printErrors(error, input2);
        return false;
    }
    if (input3.value === "") {
        printErrors(error, input3);
        return false;
    }
    if (output.value === "") {
        printErrors(error, output);
        return false;
    }
    if (LHS.value === "") {
        printErrors(error, LHS);
        return false;
    }
    if (operator.value === "") {
        printErrors(error, operator);
        return false;
    }
    if (RHS1LEFT.value === "") {
        printErrors(error, RHS1LEFT);
        return false;
    }
    if (RHS1OPERATOR.value === "") {
        printErrors(error, RHS1OPERATOR);
        return false;
    }
    if (RHS1RIGHT.value === "") {
        printErrors(error, RHS1RIGHT);
        return false;
    }
    if (RHS2LEFT.value === "") {
        printErrors(error, RHS2LEFT);
        return false;
    }
    if (RHS2OPERATOR.value === "") {
        printErrors(error, RHS2OPERATOR);
        return false;
    }
    if (RHS2RIGHT.value === "") {
        printErrors(error, RHS2RIGHT);
        return false;
    }


    // checking verilog testbench
    let tbName = document.getElementById("tb-name");
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    let moduleNameTB = document.getElementById("module-name-tb");
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    if (tbName.value.trim() == '') {
        printErrors(error, tbName);
        return false;
    }
    if (input1TB.value === "") {
        printErrors(error, input1TB);
        return false;
    }
    if (input2TB.value === "") {
        printErrors(error, input2TB);
        return false;
    }
    if (input3TB.value === "") {
        printErrors(error, input3TB);
        return false;
    }
    if (input4TB.value === "") {
        printErrors(error, input4TB);
        return false;
    }
    if (moduleNameTB.value.trim() == '') {
        printErrors(error, moduleNameTB);
        return false;
    }
    if (arg1.value === "") {
        printErrors(error, arg1);
        return false;
    }
    if (arg2.value === "") {
        printErrors(error, arg2);
        return false;
    }
    if (arg3.value === "") {
        printErrors(error, arg3);
        return false;
    }
    if (arg4.value === "") {
        printErrors(error, arg4);
        return false;
    }
    return true;
}

export function printErrors(errorMsg, errorID) {
    document.getElementById('result').innerHTML = errorMsg;
    document.getElementById('result').classList.remove('text-success');
    document.getElementById('result').classList.add('text-danger');
    if (errorID) {
        errorID.classList.add('highlight');
        setTimeout(function () {
            errorID.classList.remove('highlight');
        }, 3000);
    }
}

export function isValid() {

    // checking the order of the codeblocks
    const boxOrder1 = getBoxOrder('module');
    const boxOrder2 = getBoxOrder('tb');
    let container = document.getElementById("container");
    let containerTB = document.getElementById("containerTB");
    if (boxOrder1[0] !== "1" || boxOrder1[1] !== "2" || boxOrder1[2] !== "3") {
        let msg = "Please rearrange the code blocks of the Verilog Module in the correct order."
        printErrors(msg, container);
        return false;
    }
    if (boxOrder2[0] !== "1TB" || boxOrder2[1] !== "2TB" || boxOrder2[2] !== "3TB" || boxOrder2[3] !== "4TB" || boxOrder2[4] !== "5TB") {
        let msg = "Please rearrange the code blocks of the Verilog Testbench in the correct order."
        printErrors(msg, containerTB);
        return false;
    }


    // Checking if the module and testbench names are valid
    let tbName = document.getElementById("tb-name");
    let moduleNameTB = document.getElementById("module-name-tb");
    let moduleName = document.getElementById("module-name");
    var regex = /^[a-zA-Z][a-zA-Z0-9_]*$/;
    if (!regex.test(moduleName.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleName);
        return false;
    }
    if (!regex.test(moduleNameTB.value.trim())) {
        let msg = "Invalid Module Name.";
        printErrors(msg, moduleNameTB);
        return false;
    }
    if (!regex.test(tbName.value.trim())) {
        let msg = "Invalid Testbench Name."
        printErrors(msg, tbName);
        return false;
    }

    // checking if module name matches in both code and tb
    if (moduleName.value.trim() !== moduleNameTB.value.trim()) {
        let msg = "There is no verilog module defined with the name " + moduleNameTB.value.trim();
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking if module name is not equal to the temporary function name used to call the module in the testbench
    if (moduleNameTB.value.trim() === "uut") {
        let msg = "The name of the module instantiated and the temporary function name (uut) used to instantiate the module in the testbench cannot be the same.";
        printErrors(msg, moduleNameTB);
        return false;
    }

    // checking the input and output argument declaration in the module
    let input1 = document.getElementById("input1-selector");
    let input2 = document.getElementById("input2-selector");
    let input3 = document.getElementById("input3-selector");
    let output = document.getElementById("output-selector");
    if (input1.value === input2.value || input1.value === output.value || input1.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1);
        return false;
    }
    if (input2.value === output.value || input2.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2);
        return false;
    }
    if (output.value === input3.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, output);
        return false;
    }

    // checking assign block
    let LHS = document.getElementById("LHS-selector");
    let operator = document.getElementById("operator-selector");
    if (LHS.value === input1.value || LHS.value === input2.value || LHS.value === input3.value) {
        let msg = 'Inputs of a verilog module cannot be assigned values directly within the module itself.'
        printErrors(msg, LHS);
        return false;
    }
    if (operator.value === "<=") {
        let msg = "This operator is incorrect for a combinational behaviour.";
        printErrors(msg, operator);
        return false;
    }
    
    // checking i/o and function call arguments in test bench
    let input1TB = document.getElementById("input1TB-selector");
    let input2TB = document.getElementById("input2TB-selector");
    let input3TB = document.getElementById("input3TB-selector");
    let input4TB = document.getElementById("input4TB-selector");
    if (input1TB.value === input2TB.value || input1TB.value === input3TB.value || input1TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input1TB);
        return false;
    }
    if (input2TB.value === input3TB.value || input2TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input2TB);
        return false;
    }
    if (input3TB.value === input4TB.value) {
        let msg = 'Highlighted variable declared more than once'
        printErrors(msg, input3TB);
        return false;
    }
    if (input4TB.value === "A" || input4TB.value === "B" || input4TB.value === "S") {
        let msg = 'Highlighted code part is incorrect.'
        printErrors(msg, input4TB);
        return false;
    }
    let arg1 = document.getElementById("argument1-selector");
    let arg2 = document.getElementById("argument2-selector");
    let arg3 = document.getElementById("argument3-selector");
    let arg4 = document.getElementById("argument4-selector");
    if (arg4.value === "A" || arg4.value === "B" || arg4.value === "S") {
        let msg = "Output port of a module cannot be connected to a reg type in its test bench."
        printErrors(msg, arg4);
        return false;
    }
    if (arg1.value === "Out") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg1);
        return false;
    }
    if (arg2.value === "Out") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg2);
        return false;
    }
    if (arg3.value === "Out") {
        let msg = "Incorrect order of module instantiation ports.";
        printErrors(msg, arg3);
        return false;
    }
    return true;
}

export function printObsTable() {
    let arg1 = document.getElementById("argument1-selector").value;
    let arg2 = document.getElementById("argument2-selector").value;
    let arg3 = document.getElementById("argument3-selector").value;
    let arg4 = document.getElementById("argument4-selector").value;
    let input1 = document.getElementById("input1-selector").value;
    let input2 = document.getElementById("input2-selector").value;
    let input3 = document.getElementById("input3-selector").value;
    let output = document.getElementById("output-selector").value;
    let LHS = document.getElementById("LHS-selector").value;
    let RHS1LEFT = document.getElementById("RHS1LEFT-selector").value;
    let RHS1OPERATOR = document.getElementById("RHS1OPERATOR-selector").value;
    let RHS1RIGHT = document.getElementById("RHS1RIGHT-selector").value;
    let RHS2LEFT = document.getElementById("RHS2LEFT-selector").value;
    let RHS2OPERATOR = document.getElementById("RHS2OPERATOR-selector").value;
    let RHS2RIGHT = document.getElementById("RHS2RIGHT-selector").value;
    let arr = { "A": [0, 0, 0, 0, 1, 1, 1, 1], "B": [0,0,1,1,0,0,1,1],"S": [0,1,0,1,0,1,0,1],"Out": [0,0,0,1,1,0,1,1] };
    let body = "";
    let isCorrect = true;
    for (let i = 0; i < 8; ++i) {
        let MUX={};
        MUX[input1] = arr[arg1][i];
        MUX[input2] = arr[arg2][i];
        MUX[input3] = arr[arg3][i];
        MUX["~"+input1] = 1-arr[arg1][i];
        MUX["~"+input2] = 1-arr[arg2][i];
        MUX["~"+input3] = 1-arr[arg3][i];
        MUX[output] = "x";
        let first,second;
        if(RHS1OPERATOR==='&')
        {
            if(MUX[RHS1LEFT]===0 || MUX[RHS1RIGHT]===0)
            first=0;
            else if(MUX[RHS1LEFT]==="x" || MUX[RHS1RIGHT]==="x")
            first="x";
            else
            first=1;
        }
        else if(RHS1OPERATOR==='|')
        {
            if(MUX[RHS1LEFT]===1 || MUX[RHS1RIGHT]===1)
            first=1;
            else if(MUX[RHS1LEFT]==="x" || MUX[RHS1RIGHT]==="x")
            first="x";
            else
            first=0;
        }
        else
        {
            if(MUX[RHS1LEFT]==="x" || MUX[RHS1RIGHT]==="x")
            first="x";
            else if(MUX[RHS1LEFT]===MUX[RHS1RIGHT])
            first=0;
            else
            first=1;
        }
        if(RHS2OPERATOR==='&')
        {
            // console.log("reached2");
            // console.log(RHS2LEFT+" " + MUX[RHS2LEFT])
            // console.log(RHS2RIGHT+" " + MUX[RHS2RIGHT])
            if(MUX[RHS2LEFT]===0 || MUX[RHS2RIGHT]===0)
            second=0;
            else if(MUX[RHS2LEFT]==="x" || MUX[RHS2RIGHT]==="x")
            second="x";
            else
            second=1;
            // console.log(second);
        }
        else if(RHS2OPERATOR==='|')
        {
            if(MUX[RHS2LEFT]===1 || MUX[RHS2RIGHT]===1)
            second=1;
            else if(MUX[RHS2LEFT]==="x" || MUX[RHS2RIGHT]==="x")
            second="x";
            else
            second=0;
        }
        else
        {
            if(MUX[RHS2LEFT]==="x" || MUX[RHS2RIGHT]==="x")
            second="x";
            else if(MUX[RHS2LEFT]=== MUX[RHS2RIGHT])
            second=0;
            else
            second=1;
        }
        if(first===1 || second===1)
        MUX[LHS] = 1;
        else if(first==="x" || second==="x")
        MUX[LHS]="x";
        else
        MUX[LHS]= 0;

        let tb = {};
        tb[arg4] = MUX[output];
        if (tb["Out"] !== arr["Out"][i]) {
            isCorrect = false;
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["S"][i]}</th><td class="failure-table"> ${arr["Out"][i]} </td><td class="failure-table"> ${tb["Out"]}</td>`;
        }
        else {
            body += `<tr class="bold-table"><th>${i}</th><th>${arr["A"][i]}</th><th>${arr["B"][i]} </th><th>${arr["S"][i]}</th><td class="success-table"> ${arr["Out"][i]} </td><td class="success-table"> ${tb["Out"]}</td>`;
        }
    }
    document.getElementById("table-body").innerHTML = body;
    if (isCorrect) {
        document.getElementById("result").innerHTML = "<span>&#10003;</span> Success"
        document.getElementById("result").className = "text-success";
    }
    else {
        document.getElementById("result").innerHTML = "<span>&#10007;</span> Fail";
        document.getElementById("result").className = "text-danger";
    }
    return;
}
