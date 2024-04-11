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
    #pess_dataCria;
    #pess_dataAtualiza;

    getPess_id() {
        return this.#pess_id;
    }

    setPess_id(value) {
        this.#pess_id = value;
    }

    getPess_nome() {
        return this.#pess_nome;
    }

    setPess_nome(value) {
        this.#pess_nome = value;
    }

    getPess_cpf() {
        return this.#pess_cpf;
    }

    setPess_cpf(value) {
        this.#pess_cpf = value;
    }

    getPess_rg() {
        return this.#pess_rg;
    }

    setPess_rg(value) {
        this.#pess_rg = value;
    }

    getPess_nasc() {
        return this.#pess_nasc;
    }

    setPess_nasc(value) {
        this.#pess_nasc = value;
    }

    getPess_nacio() {
        return this.#pess_nacio;
    }

    setPess_nacio(value) {
        this.#pess_nacio = value;
    }

    getPess_genero() {
        return this.#pess_genero;
    }

    setPess_genero(value) {
        this.#pess_genero = value;
    }

    getPess_tel() {
        return this.#pess_tel;
    }

    setPess_tel(value) {
        this.#pess_tel = value;
    }

    getEnd_id() {
        return this.#end_id;
    }

    setEnd_id(value) {
        this.#end_id = value;
    }

    getPess_dataCria() {
        return this.#pess_dataCria;
    }

    setPess_dataCria(value) {
        this.#pess_dataCria = value;
    }

    getPess_dataAtualiza() {
        return this.#pess_dataAtualiza;
    }

    setPess_dataAtualiza(value) {
        this.#pess_dataAtualiza = value;
    }

    constructor(pess_id, pess_nome, pess_cpf, pess_rg, pess_nasc, pess_nacio, pess_genero, pess_tel, end_id, pess_dataCria, pess_dataAtualiza) {
        this.#pess_id = pess_id;
        this.#pess_nome = pess_nome;
        this.#pess_cpf = pess_cpf;
        this.#pess_rg = pess_rg;
        this.#pess_nasc = pess_nasc;
        this.#pess_nacio = pess_nacio;
        this.#pess_genero = pess_genero;
        this.#pess_tel = pess_tel;
        this.#end_id = end_id;
        this.#pess_dataCria = pess_dataCria;
        this.#pess_dataAtualiza = pess_dataAtualiza;
    }

    async listarPessoa() {
        let sql = "SELECT * FROM tb_pessoas";

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
                rows[i]["pess_dataCria"],
                rows[i]["pess_dataAtualiza"]
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
                row["pess_dataCria"],
                row["pess_dataAtualiza"]
            );
        }
    }
}

module.exports = PessoaModel;