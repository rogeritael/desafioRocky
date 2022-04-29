let database = require('./broken-database.json');

class classDatabase{
    /* Recupera o arquivo json corrompido e coloca em uma variável para ser tratado; a variável "newJson" irá receber o arquivo já
    tratado ao concluir os devidos processos.*/
    constructor(json){
        this.json = json;
        this.newJson = [];
    }

    //função auxiliar para adicionar os dados corrigidos ao array de objetos
    updateJson(id, name, quantity, price, category){
        
        this.newJson.push({
            "id": id,
            "name": name,
            "quantity": quantity,
            "price": price,
            "category": category
        });
    }

    //corrige o erro de orografia no nome do objeto
    nameFix(){
        this.newJson = [];

        this.json.map((item) => {
            let newName = item.name;
            newName = newName.replaceAll('ø', 'o');
            newName = newName.replaceAll('æ', 'a');
            newName = newName.replaceAll('¢', 'c');
            newName = newName.replaceAll('ß', 'b');
            
            this.updateJson(
                item.id,
                newName,
                item.quantity,
                item.price,
                item.category
            );
            
        });

        this.json = this.newJson;
    }

    //seleciona os preços que estão no formato string e passa para o formato float
    priceFix(){
        this.newJson = [];

        this.json.map((item) => {
            if(typeof(item.price) == "string"){
                item.price = parseFloat(item.price);
            }
            
            this.updateJson(
                item.id,
                item.name,
                item.quantity,
                item.price,
                item.category
            );
        });

        this.json = this.newJson;
    }
    
    //ajusta a quantidade dos produtos que deveriam ter o valor 0 mas que estão undefined
    quantityFix(){
        this.newJson = [];

        this.json.map((item) => {
            if(item.quantity == undefined){
                item.quantity = 0;
            };

            this.updateJson(
                item.id,
                item.name,
                item.quantity,
                item.price,
                item.category
            );
        });

        this.json = this.newJson;
    }


}

fixedDatabase = new classDatabase(database);
fixedDatabase.nameFix();
fixedDatabase.priceFix();
fixedDatabase.quantityFix();
console.log(fixedDatabase.json)