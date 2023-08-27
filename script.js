let total = 0;
let buffer = "0";
let prev_op;

const screen = document.querySelector(".screen");

function buttonclk (value)
{
    if (isNaN(value))
    {
        handlesymbol(value);
    }
    else{
        handlenum(value);
    }
    screen.innerText = buffer;
}

function handlesymbol(symbol)
{
    switch(symbol){
        case 'C':
            buffer ="0";
            total = 0;
            break;

        case '=':
            if (prev_op === null){
                return
            }
            else{
                operation(parseInt(buffer));
                prev_op = null;
                buffer = total;
                total = 0;
                break;
            }

        case '←':
            if(buffer.length === 1){
                buffer="0";
            }
            else{
                buffer = buffer.slice(0,-1);
            }
            break;

        case '+':
        case '−':
        case '÷':
        case '×':
            handlemaths(symbol);
            break;
    }
}

function handlemaths(symbol){
    if (buffer === "0"){
        return
    }
    else{
        const intbuffer = parseInt(buffer);
        if (total === 0){
            total = intbuffer;
        }
        else{
            operation(intbuffer);
        }
    }
    prev_op = symbol;
    buffer = "0";
}

function operation(intbuffer){
    if(prev_op === '+'){
        total += intbuffer;
    }
    else if(prev_op === '−'){
        total -= intbuffer;
    }
    else if(prev_op === '×'){
        total *= intbuffer;
    }
    else if(prev_op === '÷'){
        total /= intbuffer;
    }
}

function handlenum(numberstring){
    if(buffer === "0"){
        buffer = numberstring;
    }
    else{
        buffer+=numberstring;
    }
}

function init(){
    document.querySelector('.buttons').addEventListener('click', function(event){
        buttonclk(event.target.innerText);
    })
}
init();