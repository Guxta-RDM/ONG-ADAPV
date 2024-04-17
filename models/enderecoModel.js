const Database = require("../utils/database");

const banco = new Database();

class EnderecoModel {

    #end_id;
    #end_cep;
    #end_rua;
    #end_bairro;
    #end_numero;
    #end_cidade;
    #end_estado;
    #end_complemento;
    #createdAt;
    #updatedAt;

    // Getters

    getEndId() {
        return this.end_id;
    }

    getEndCep() {
        return this.end_cep;
    }

    getEndRua() {
        return this.end_rua;
    }

    getEndBairro() {
        return this.end_bairro;
    }

    getEndNumero() {
        return this.end_numero;
    }

    getEndCidade() {
        return this.end_cidade;
    }

    getEndEstado() {
        return this.end_estado;
    }

    getEndComplemento() {
        return this.end_complemento;
    }

    getEndDataCria() {
        return this.createdAt;
    }

    getEndDataAtualiza() {
        return this.updatedAt;
    }

    // Setters

    setEndId(end_id) {
        this.end_id = end_id;
    }

    setEndCep(end_cep) {
        this.end_cep = end_cep;
    }

    setEndRua(end_rua) {
        this.end_rua = end_rua;
    }

    setEndBairro(end_bairro) {
        this.end_bairro = end_bairro;
    }

    setEndNumero(end_numero) {
        this.end_numero = end_numero;
    }

    setEndCidade(end_cidade) {
        this.end_cidade = end_cidade;
    }

    setEndEstado(end_estado) {
        this.end_estado = end_estado;
    }

    setEndComplemento(end_complemento) {
        this.end_complemento = end_complemento;
    }

    setEndDataCria(createdAt) {
        this.createdAt = createdAt;
    }

    setEndDataAtualiza(updatedAt) {
        this.updatedAt = updatedAt;
    }

    constructor(end_id, end_cep, end_rua, end_bairro, end_numero, end_cidade, end_estado, end_complemento, createdAt, updatedAt) {

        this.#end_id = end_id;
        this.#end_cep = end_cep;
        this.#end_rua = end_rua;
        this.#end_bairro = end_bairro;
        this.#end_numero = end_numero;
        this.#end_cidade = end_cidade;
        this.#end_estado = end_estado;
        this.#end_complemento = end_complemento;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Funções

    async listarEndereco() {

        let sql = "select * from tb_endereco";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new EnderecoModel(rows[i]["end_id"], rows[i]["end_cep"], rows[i]["end_rua"], rows[i]["end_bairro"], rows[i]["end_numero"], rows[i]["end_cidade"], rows[i]["end_estado"], rows[i]["end_complemento"], rows[i]["createdAt"], rows[i]["updatedAt"]));
        }

        return lista;
    }

    async obterEndId(id) {

        let sql = "select * from tb_endereco where end_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new EnderecoModel(row["end_id"],
                row["end_cep"],
                row["end_rua"],
                row["end_bairro"],
                row["end_numero"],
                row["end_cidade"],
                row["end_estado"],
                row["end_complemento"],
                row["createdAt"],
                row["updatedAt"]);

        }

    }

    async cadastrarEndereço() {
        if (this.#end_id == 0) {
            let sql = "INSERT INTO tb_endereco (end_cep, end_rua, end_bairro, end_numero, end_cidade, end_estado, end_complemento, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?,?,)";

            let valores = [this.#end_cep, this.#end_rua, this.#end_bairro, this.#end_numero, this.#end_cidade, this.#end_estado, this.#end_complemento, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "UPDATE tb_endereco SET end_cep = ?, end_rua = ?, end_bairro = ?, end_numero = ?, end_cidade = ?, end_estado = ?, end_complemento = ?, createdAt = ?, updatedAt = ? WHERE end_id = ?";

            let valores = [this.#end_cep, this.#end_rua, this.#end_bairro, this.#end_numero, this.#end_cidade, this.#end_estado, this.#end_complemento, this.#createdAt, this.#updatedAt, this.#end_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }

    }

    async excluir(id) {
        let sql = "DELETE FROM tb_endereco WHERE end_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = EnderecoModel;