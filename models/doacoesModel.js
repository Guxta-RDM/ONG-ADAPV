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
    get doa_id() { return this.#doa_id }
    get doa_tipo() { return this.#doa_tipo }
    get doa_doador() { return this.#doa_doador }
    get doa_cpf_cnpj() { return this.#doa_cpf_cnpj }
    get doa_rg() { return this.#doa_rg }
    get doa_data() { return this.#doa_data }
    get doa_desc() { return this.#doa_desc }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters
    set doa_id(value) { this.#doa_id = value }
    set doa_tipo(value) { this.#doa_tipo = value }
    set doa_doador(value) { this.#doa_doador = value }
    set doa_cpf_cnpj(value) { this.#doa_cpf_cnpj = value }
    set doa_rg(value) { this.#doa_rg = value }
    set doa_data(value) { this.#doa_data = value }
    set doa_desc(value) { this.#doa_desc = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(doa_id, doa_tipo, doa_doador, doa_cpf_cnpj, doa_rg, doa_data, doa_desc, createdAt, updatedAt) {

        this.#doa_id = doa_id;
        this.#doa_tipo = doa_tipo;
        this.#doa_doador = doa_doador;
        this.#doa_cpf_cnpj = doa_cpf_cnpj;
        this.#doa_rg = doa_rg;
        this.#doa_data = doa_data;
        this.#doa_desc = doa_desc;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Métodos

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

    }

    async editarDoacao() {
        let sql = "UPDATE tb_doacao SET doa_tipo = ?, doa_doador = ?, doa_cpf_cnpj = ?, doa_rg = ?, doa_data = ?, doa_desc = ?, createdAt = ?, updatedAt = ? where doa_id = ?";

        let valores = [this.#doa_tipo, this.#doa_doador, this.#doa_cpf_cnpj, this.#doa_rg, this.#doa_data, this.#doa_desc, this.#createdAt, this.#updatedAt, this.#doa_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_doacao WHERE doa_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = DoacoesModel;