const Database = require("../utils/database");

const banco = new Database();

class DoacoesModel {

    #doa_id;
    #doa_tipo;
    #doa_doador;
    #doa_cpf_cnpj;
    #doa_rg;
    #doa_data;
    #doa_desc;
    #doa_dataCria;
    #doa_dataAtualiza;

    // Getters
    getDoaId() {
        return this.#doa_id;
    }

    getDoaTipo() {
        return this.#doa_tipo;
    }

    getDoaDoador() {
        return this.#doa_doador;
    }

    getDoaCpfCnpj() {
        return this.#doa_cpf_cnpj;
    }

    getDoaRg() {
        return this.#doa_rg;
    }

    getDoaData() {
        return this.#doa_data;
    }

    getDoaDesc() {
        return this.#doa_desc;
    }

    getDataCria() {
        return this.#doa_dataCria;
    }

    getDataAtualiza() {
        return this.#doa_dataAtualiza;
    }

    // Setters
    setDoaId(value) {
        this.#doa_id = value;
    }

    setDoaTipo(value) {
        this.#doa_tipo = value;
    }

    setDoador(value) {
        this.#doa_doador = value;
    }

    setDoaCpfCnpj(value) {
        this.#doa_cpf_cnpj = value;
    }

    setDoaRg(value) {
        this.#doa_rg = value;
    }

    setDoaData(value) {
        this.#doa_data = value;
    }

    setDoaDesc(value) {
        this.#doa_desc = value;
    }

    setDataCria(value) {
        this.#doa_dataCria = value;
    }

    setDataAtualiza(value) {
        this.#doa_dataAtualiza = value;
    }

    async listarDoacoes() {
        let sql = "SELECT * FROM tb_doacao";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let doacao = new DoacoesModel();
            doacao.#doa_id = rows[i]["doa_id"];
            doacao.#doa_tipo = rows[i]["doa_tipo"];
            doacao.#doa_doador = rows[i]["doa_doador"];
            doacao.#doa_cpf_cnpj = rows[i]["doa_cpf_cnpj"];
            doacao.#doa_rg = rows[i]["doa_rg"];
            doacao.#doa_data = rows[i]["doa_data"];
            doacao.#doa_desc = rows[i]["doa_desc"];
            doacao.#doa_dataCria = rows[i]["doa_dataCria"];
            doacao.#doa_dataAtualiza = rows[i]["doa_dataAtualiza"];
            lista.push(doacao);
        }

        return lista;
    }

    async listarDoacoes() {
        let sql = "SELECT * FROM tb_doacao";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            let row = rows[i];
            let doacao = new DoacoesModel();
            doacao.#doa_id = row["doa_id"];
            doacao.#doa_tipo = row["doa_tipo"];
            doacao.#doa_doador = row["doa_doador"];
            doacao.#doa_cpf_cnpj = row["doa_cpf_cnpj"];
            doacao.#doa_rg = row["doa_rg"];
            doacao.#doa_data = row["doa_data"];
            doacao.#doa_desc = row["doa_desc"];
            doacao.#doa_dataCria = row["doa_dataCria"];
            doacao.#doa_dataAtualiza = row["doa_dataAtualiza"];
            lista.push(doacao);
        }

        return lista;
    }
}

module.exports = DoacoesModel;