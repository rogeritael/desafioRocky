let database = require('./broken-database.json');

class classDatabase{
    /* Recupera o arquivo json corrompido e coloca em uma variável para ser tratado; a variável "newJson" irá receber o arquivo já
    tratado ao concluir os devidos processos.*/
    constructor(json){
        this.json = json;
        this.newJson = [];
    }

    nameFix(){
        this.json.map((item) => {
            item.name;
            console.log(item.name)
        })
    }



}

fixedDatabase = new classDatabase(database);
// console.log(fixedDatabase.json);
fixedDatabase.nameFix();