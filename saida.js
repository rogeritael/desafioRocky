let database = require('./broken-database.json');
let classDatabase = require('./resolution');

//corrige o arquivo json corrompido
let fixedDatabase = new classDatabase(database);
    fixedDatabase.nameFix();
    fixedDatabase.priceFix();
    fixedDatabase.quantityFix();


//imprime a database corrigida
console.log("Database corrigida: ");
    let Json = fixedDatabase.json;
    console.log(Json);
    console.log("\n \n \n");
//imprime o valor total por categoria
console.log("Total por categoria: ");
    let total = fixedDatabase.getTotalByCategory();
    console.log(total);
    console.log("\n \n \n");
//imprime a database ordenada por nome e ID
console.log("Database ordenada: ");
    let orderedDB = fixedDatabase.orderByNameAndId();
    console.log(orderedDB)

