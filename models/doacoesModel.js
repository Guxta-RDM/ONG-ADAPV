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
    #createdAt;
    #updatedAt;

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
        return this.#createdAt;
    }

    getDataAtualiza() {
        return this.#updatedAt;
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
        this.#createdAt = value;
    }

    setDataAtualiza(value) {
        this.#updatedAt = value;
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
            doacao.#createdAt = row["createdAt"];
            doacao.#updatedAt = row["updatedAt"];
            lista.push(doacao);
        }

        return lista;
    }

    async obterDoaId(id) {
        let sql = "SELECT * FROM tb_doacao WHERE doa_id = ?";

        let valores = [id];

        let rows = await banco.ExecutaComando(sql, valores);

        if (rows.length > 0) {
            let row = rows[0];
            return new DoacoesModel(
                row["doa_id"],
                row["doa_tipo"],
                row["doa_doador"],
                row["doa_cpf_cnpj"],
                row["doa_rg"],
                row["doa_data"],
                row["doa_desc"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrarDoacao() {
        if (this.#doa_id == 0) {
            let sql = "INSERT INTO tb_doacao (doa_tipo, doa_doador, doa_cpf_cnpj, doa_rg, doa_data, doa_desc, createdAt, updatedAt) VALUES (?,?,?,?,?,?,?,?)";

            let valores = [this.#doa_tipo, this.#doa_doador, this.#doa_cpf_cnpj, this.#doa_rg, this.#doa_data, this.#doa_desc, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
        else {
            let sql = "UPDATE tb_doacao SET doa_tipo = ?, doa_doador = ?, doa_cpf_cnpj = ?, doa_rg = ?, doa_data = ?, doa_desc = ?, createdAt = ?, updatedAt = ? where doa_id = ?";

            let valores = [this.#doa_tipo, this.#doa_doador, this.#doa_cpf_cnpj, this.#doa_rg, this.#doa_data, this.#doa_desc, this.#createdAt, this.#updatedAt, this.#doa_id];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_doacao WHERE doa_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = DoacoesModel;