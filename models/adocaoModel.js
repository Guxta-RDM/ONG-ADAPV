const Database = require("../utils/database");

const banco = new Database();

class AdocaoModel {

    #ado_id;
    #ado_dataCria;
    #ado_dataAtualiza;

    // Getters

    getAdoId() { return this.#ado_id }

    getDataCria() { return this.#ado_dataCria }

    getDataAtualiza() { return this.#ado_dataAtualiza }

    // Setters

    setAdoId(newAdoId) { this.#ado_id = newAdoId }

    setDataCria(newDataCria) { this.#ado_dataCria = newDataCria }

    setDataAtualiza(newDataAtualiza) { this.#ado_dataAtualiza = newDataAtualiza }

    constructor(ado_id, ado_dataCria, ado_dataAtualiza) {

        this.#ado_id = ado_id;
        this.#ado_dataCria = ado_dataCria;
        this.#ado_dataAtualiza = ado_dataAtualiza;

    }

    // Funções

    async listar() {

        let sql = "select * from tb_adocao";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AdocaoModel(rows[i]["ado_id"], rows[i]["ado_dataCria"], rows[i]["ado_dataAtualiza"]));
        }

        return lista;

    }

    async obterAdoId(id) {

        let sql = "select * from tb_adocao where ado_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new AdocaoModel(row["ado_id"], row["ado_dataCria"], row["ado_dataAtualiza"]);

        }

    }

}