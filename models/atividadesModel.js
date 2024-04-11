const Database = require("../utils/database");

const banco = new Database();

class AtividadeModel {

    #atv_id;
    #atv_nome;
    #atv_desc;
    #atv_data;
    #vol_id;
    #emp_id;
    #atv_dataCria;
    #atv_dataAtualiza;

    // Métodos getters
    getAtvId() {
        return this.#atv_id;
    }

    getAtvNome() {
        return this.#atv_nome;
    }

    getAtvDesc() {
        return this.#atv_desc;
    }

    getAtvData() {
        return this.#atv_data;
    }

    getVolId() {
        return this.#vol_id;
    }

    getEmpId() { return this.#emp_id }

    getDataCria() { return this.#atv_dataCria }

    getDataAtualiza() { return this.#atv_dataAtualiza }

    // Métodos setters
    setAtvId(value) {
        this.#atv_id = value;
    }

    setAtvNome(value) {
        this.#atv_nome = value;
    }

    setAtvDesc(value) {
        this.#atv_desc = value;
    }

    setAtvData(value) {
        this.#atv_data = value;
    }

    setVolId(value) {
        this.#vol_id = value;
    }

    setEmpId(value) {
        this.#emp_id = value;
    }

    setDataCria(value) {
        this.#atv_dataCria = value;
    }

    setDataAtualiza(value) {
        this.#atv_dataAtualiza = value;
    }

    constructor(atv_id, atv_nome, atv_desc, atv_data, vol_id, emp_id, atv_dataCria, atv_dataAtualiza) {
        this.#atv_id = atv_id;
        this.#atv_nome = atv_nome;
        this.#atv_desc = atv_desc;
        this.#atv_data = atv_data;
        this.#vol_id = vol_id;
        this.#emp_id = emp_id;
        this.#atv_dataCria = atv_dataCria;
        this.#atv_dataAtualiza = atv_dataAtualiza;
    }

    async listarAtividades() {
        let sql = "SELECT * FROM tb_atividades";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new Atividade(
                rows[i]["atv_id"],
                rows[i]["atv_nome"],
                rows[i]["atv_desc"],
                rows[i]["atv_data"],
                rows[i]["vol_id"],
                rows[i]["emp_id"],
                rows[i]["atv_dataCria"],
                rows[i]["atv_dataAtualiza"]
            ));
        }

        return lista;
    }

    async obterAtividadeId(id) {
        let sql = "SELECT * FROM tb_atividades WHERE atv_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];
            return new Atividade(
                row["atv_id"],
                row["atv_nome"],
                row["atv_desc"],
                row["atv_data"],
                row["vol_id"],
                row["emp_id"],
                row["atv_dataCria"],
                row["atv_dataAtualiza"]
            );
        }
    }
}

module.exports = AtividadeModel;