//1
const fs = require('fs');

const ret = fs.readFileSync('./data.csv').toString().split("\n");   
const keys = ret[0].split(',');

const values = [];
for(let i = 1; i < ret.length - 1; i++) {
    values.push(ret[i]);
}

const dataAsJson = values.map(value => {
    const vals = value.split(',');
    const obj = {};
    for(let j = 0; j < keys.length; j++) {
        obj[keys[j]] = vals[j];
    }
    return obj;
});



//2
function filterByString(str) {
    return dataAsJson.filter(data => data.cidade.toLowerCase() === str.toLowerCase());
}


//3
function orderBy(colNum, order) {
    if(colNum > 2) return;
    
    let ret = [];
    const orderBy = keys[colNum];

    if(order === 'asc') {
        ret = [...dataAsJson].sort((a, b) => {
             if (a[orderBy] < b[orderBy]){
                return -1;
            }
            if (a[orderBy] > b[orderBy]){
                return 1;
            }
            return 0;
        });
    } 

    if(order === 'desc') {
        ret = [...dataAsJson].sort((a, b) => {
             if (a[orderBy] > b[orderBy]){
                return -1;
            }
            if (a[orderBy] < b[orderBy]){
                return 1;
            }
            return 0;
        });
    } 

    const vals = ret.reduce((ary, curr) => {
        Object.values(curr).forEach(val => ary.push(val));
        return ary;
    }, []);

    return [[...keys, ...vals]]
}


//4
let ary = [];
for(let i = 0; i < 100; i++) {
    ary.push(Math.floor(Math.random()*100));
}

ary = ary.filter(num => num % 2 == 1);




//5
let monthCount = 0;
function loanSimulator(totalValue, paidValue, interest) {
    totalValue = totalValue + totalValue * (interest/100);
    totalValue = totalValue - paidValue;
    
    if(totalValue <= 0) return;

    monthCount++;
    loanSimulator(totalValue, paidValue, interest);
}


 
