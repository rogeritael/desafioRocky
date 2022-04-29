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

    //retorna o valor total por categoria
    getTotalByCategory(){
        let acessoriosTotal = 0;
        let eletronicosTotal = 0;
        let eletrodomesticosTotal = 0;
        let panelasTotal = 0;

        this.json.map((item) => {
            switch(item.category)
            {
                case "Acessórios":
                    item.quantity > 0 ?
                        acessoriosTotal += (item.quantity * item.price) : acessoriosTotal += 0;
                    break;
                case "Eletrodomésticos":
                    item.quantity > 0 ?
                        eletrodomesticosTotal += (item.quantity * item.price) : eletrodomesticosTotal += 0;
                    break;
                case "Panelas":
                    item.quantity > 0 ?
                        panelasTotal += (item.quantity * item.price) : panelasTotal += 0;
                    break;
                case "Eletrônicos":
                    item.quantity > 0 ?
                        eletronicosTotal += (item.quantity * item.price) : eletronicosTotal += 0;
                    break;
            }
        });

        eletronicosTotal <= 0 ? eletronicosTotal = "O estoque está vazio" : eletronicosTotal = eletronicosTotal.toFixed(2);
        panelasTotal <= 0 ? panelasTotal = "O estoque está vazio" : panelasTotal = panelasTotal.toFixed(2);
        eletrodomesticosTotal <= 0 ? eletrodomesticosTotal = "O estoque está vazio" : eletrodomesticosTotal = eletrodomesticosTotal.toFixed(2);
        acessoriosTotal <= 0 ? acessoriosTotal = "O estoque está vazio" : acessoriosTotal = acessoriosTotal.toFixed(2);

        let total = [
            {
                eletronicos: eletronicosTotal,
                eletrodomesticos: eletrodomesticosTotal,
                acessorios: acessoriosTotal,
                panelas: panelasTotal
            }
        ];

        console.log(total)
    }

    //ordena a database de forma alfabética e por id
    orderByNameAndId(){
        let ordered = this.json.sort(function(a, b) {
            if(a.id < b.id){
                return -1;
            }else{
                return true;
            }
        });

        ordered = ordered = this.json.sort(function(a, b) {
            if(a.name < b.name){
                return -1;
            }else{
                return true;
            }
        });

        console.log(ordered);
    }

}

module.exports = classDatabase;
