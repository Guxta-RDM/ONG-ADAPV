const Database = require("../utils/database");

const banco = new Database();

class PessoaModel {

    #pess_id;
    #pess_nome;
    #pess_cpf;
    #pess_rg;
    #pess_nasc;
    #pess_nacio;
    #pess_genero;
    #pess_tel;
    #end_id;
    #createdAt;
    #updatedAt;

    get Pess_id() {
        return this.#pess_id;
    }

    set Pess_id(value) {
        this.#pess_id = value;
    }

    get Pess_nome() {
        return this.#pess_nome;
    }

    set Pess_nome(value) {
        this.#pess_nome = value;
    }

    get Pess_cpf() {
        return this.#pess_cpf;
    }

    set Pess_cpf(value) {
        this.#pess_cpf = value;
    }

    get Pess_rg() {
        return this.#pess_rg;
    }

    set Pess_rg(value) {
        this.#pess_rg = value;
    }

    get Pess_nasc() {
        return this.#pess_nasc;
    }

    set Pess_nasc(value) {
        this.#pess_nasc = value;
    }

    get Pess_nacio() {
        return this.#pess_nacio;
    }

    set Pess_nacio(value) {
        this.#pess_nacio = value;
    }

    get Pess_genero() {
        return this.#pess_genero;
    }

    set Pess_genero(value) {
        this.#pess_genero = value;
    }

    get Pess_tel() {
        return this.#pess_tel;
    }

    set Pess_tel(value) {
        this.#pess_tel = value;
    }

    get End_id() {
        return this.#end_id;
    }

    set End_id(value) {
        this.#end_id = value;
    }

    get CreatedAt() {
        return this.#createdAt;
    }

    set CreatedAt(value) {
        this.#createdAt = value;
    }

    get UpdatedAt() {
        return this.#updatedAt;
    }

    set UpdatedAt(value) {
        this.#updatedAt = value;
    }

    constructor(pess_id, pess_nome, pess_cpf, pess_rg, pess_nasc, pess_nacio, pess_genero, pess_tel, end_id, createdAt, updatedAt) {
        this.#pess_id = pess_id;
        this.#pess_nome = pess_nome;
        this.#pess_cpf = pess_cpf;
        this.#pess_rg = pess_rg;
        this.#pess_nasc = pess_nasc;
        this.#pess_nacio = pess_nacio;
        this.#pess_genero = pess_genero;
        this.#pess_tel = pess_tel;
        this.#end_id = end_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
    }

    async listarPessoa() {
        let sql = "SELECT * FROM tb_pessoa";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new PessoaModel(
                rows[i]["pess_id"],
                rows[i]["pess_nome"],
                rows[i]["pess_cpf"],
                rows[i]["pess_rg"],
                rows[i]["pess_nasc"],
                rows[i]["pess_nacio"],
                rows[i]["pess_genero"],
                rows[i]["pess_tel"],
                rows[i]["end_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;
    }

    async obterPessId(id) {
        let sql = "SELECT * FROM tb_pessoa WHERE pess_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new PessoaModel(
                row["pess_id"],
                row["pess_nome"],
                row["pess_cpf"],
                row["pess_rg"],
                row["pess_nasc"],
                row["pess_nacio"],
                row["pess_genero"],
                row["pess_tel"],
                row["end_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarPessoa() {
        if (this.#pess_id == 0) {
            let sql = "INSERT INTO tb_pessoa (pess_nome, pess_cpf, pess_rg, pess_nasc, pess_nacio, pess_genero, pess_tel, end_id, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"

            let valores = [this.#pess_nome, this.#pess_cpf, this.#pess_rg, this.#pess_nasc, this.#pess_nacio, this.#pess_genero, this.#pess_tel, this.#end_id, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarPessoa() {
        let sql = "UPDATE tb_pessoa SET pess_nome = ?, pess_cpf = ?, pess_rg = ?, pess_nasc = ?, pess_nacio = ?, pess_genero = ?, pess_tel = ?, end_id = ?, createdAt = ?, updatedAt = ? WHERE pess_id = ?"

        let valores = [this.#pess_nome, this.#pess_cpf, this.#pess_rg, this.#pess_nasc, this.#pess_nacio, this.#pess_genero, this.#pess_tel, this.#end_id, this.#createdAt, this.#updatedAt, this.#pess_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_pessoa WHERE pess_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = PessoaModel;