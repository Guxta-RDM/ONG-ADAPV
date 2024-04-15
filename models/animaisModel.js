const Database = require("../utils/database");

const banco = new Database();

class AnimaisModel {

    #ani_id;
    #ani_nome;
    #ani_nascimento;
    #ani_raça;
    #ani_sexo;
    #ani_especie;
    #ani_pelagem;
    #ani_ester
    #ani_estado;
    #createdAt;
    #updatedAt;


    // Getters
    get ani_id() { return this.#ani_id }

    get ani_nome() { return this.#ani_nome }

    get ani_nascimento() { return this.#ani_nascimento }

    get ani_raça() { return this.#ani_raça }

    get ani_sexo() { return this.#ani_sexo }

    get ani_especie() { return this.#ani_especie }

    get ani_pelagem() { return this.#ani_pelagem }

    get ani_ester() { return this.#ani_ester}

    get ani_estado() { return this.#ani_estado }

    get createdAt() { return this.#createdAt }

    get updatedAt() { return this.#updatedAt }

    // Setters
    set ani_id(ani_id) {
        this.#ani_id = ani_id;
    }

    set ani_nome(ani_nome) {
        this.#ani_nome = ani_nome;
    }

    set ani_nascimento(ani_nascimento) {
        this.#ani_nascimento = ani_nascimento;
    }

    set ani_raça(ani_raça) {
        this.#ani_raça = ani_raça;
    }

    set ani_sexo(ani_sexo) {
        this.#ani_sexo = ani_sexo;
    }

    set ani_especie(ani_especie) {
        this.#ani_especie = ani_especie;
    }

    set ani_pelagem(ani_pelagem) {
        this.#ani_pelagem = ani_pelagem;
    }

    set ani_ester(ani_ester){
        this.#ani_ester = ani_ester
    }

    set ani_estado(ani_estado) {
        this.#ani_estado = ani_estado;
    }

    set createdAt(createdAt) {
        this.#createdAt = createdAt;
    }

    set updatedAt(updatedAt) {
        this.#updatedAt = updatedAt;
    }

    constructor(ani_id, ani_nome, ani_nascimento, ani_raça, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, createdAt, updatedAt) {
        this.#ani_id = ani_id;
        this.#ani_nome = ani_nome;
        this.#ani_nascimento = ani_nascimento;
        this.#ani_raça = ani_raça;
        this.#ani_sexo = ani_sexo;
        this.#ani_especie = ani_especie;
        this.#ani_pelagem = ani_pelagem;
        this.#ani_ester = ani_ester
        this.#ani_estado = ani_estado;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    async listarAnimais() {
        let sql = "SELECT * FROM tb_animais";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AnimaisModel(
                rows[i]["ani_id"],
                rows[i]["ani_nome"],
                rows[i]["ani_nascimento"],
                rows[i]["ani_raça"],
                rows[i]["ani_sexo"],
                rows[i]["ani_especie"],
                rows[i]["ani_pelagem"],
                rows[i]["ani_ester"],
                rows[i]["ani_estado"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async obterAnimId(id) {
        let sql = "SELECT * FROM tb_animais WHERE ani_id = ?";
        let valores = [id];
        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new AnimaisModel(
                row["ani_id"],
                row["ani_nome"],
                row["ani_nascimento"],
                row["ani_raça"],
                row["ani_sexo"],
                row["ani_especie"],
                row["ani_pelagem"],
                row["ani_ester"],
                row["ani_estado"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrar(){
        if(this.#ani_id == 0) {
            let sql = "insert into tb_animais (ani_nome, ani_nascimento, ani_raça, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?)";
    
            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raça, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#createdAt, this.#updatedAt];
            
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
        else{
            let sql = "update tb_animais set ani_nome = ?, ani_nascimento = ?, ani_raça = ?, ani_sexo = ?, ani_especie = ?, ani_pelagem = ?, ani_ester = ?, ani_estado = ?, createdAt = ?, updatedAt = ? where ani_id = ?";
    
            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raça, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#createdAt, this.#updatedAt, this.#ani_id];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }

    // CRIEI UMA OUTRA FUNÇÃO ALTERAR PARA CASO EXISTA UMA IMPLEMETAÇÃO QUE O FÚLVIO QUEIRA FAZER ESTÁ SEPARADO E FICA MAIS FÁCIL DE ENTENDER. MAS INICIALMENTE AS DUAS TEM A MESMA FUNÇÃO

    async alterar(){
        if(this.#ani_id == 0) {
            let sql = "insert into tb_animais (ani_nome, ani_nascimento, ani_raça, ani_sexo, ani_especie, ani_pelagem, ani_ester, ani_estado, createdAt, updatedAt) values (?,?,?,?,?,?,?,?,?,?)";
    
            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raça, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#createdAt, this.#updatedAt];
            
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
    
            return result;
        }
        else{
            let sql = "update tb_animais set ani_nome = ?, ani_nascimento = ?, ani_raça = ?, ani_sexo = ?, ani_especie = ?, ani_pelagem = ?, ani_ester = ?, ani_estado = ?, createdAt = ?, updatedAt = ? where ani_id = ?";
    
            let valores = [this.#ani_nome, this.#ani_nascimento, this.#ani_raça, this.#ani_sexo, this.#ani_especie, this.#ani_pelagem, this.#ani_ester, this.#ani_estado, this.#createdAt, this.#updatedAt, this.#ani_id];
    
            let result = await banco.ExecutaComandoNonQuery(sql, valores);
            return result;
        }
    }
    
}

module.exports = AnimaisModel;