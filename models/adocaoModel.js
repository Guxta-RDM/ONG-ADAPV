const Database = require("../utils/database");

const banco = new Database();

class AdocaoModel {

    #ado_id;
    #pess_id;
    #ani_id;
    #ado_dataCria;
    #ado_dataAtualiza;

    // Getters

    get_AdoId() { return this.#ado_id }

    get_PessId() { return this.#pess_id }

    get_AniId() { return this.#ani_id }

    get_DataCria() { return this.#ado_dataCria }

    get_DataAtualiza() { return this.#ado_dataAtualiza }

    // Setters

    set_AdoId(newAdoId) { this.#ado_id = newAdoId }

    set_DataCria(newDataCria) { this.#ado_dataCria = newDataCria }

    set_DataAtualiza(newDataAtualiza) { this.#ado_dataAtualiza = newDataAtualiza }

    set_PessId(newId) { this.#pess_id = newId }

    set_AniId(newId) { this.#ani_id = newId }

    constructor(ado_id, pess_id, ani_id, ado_dataCria, ado_dataAtualiza) {

        this.#ado_id = ado_id;
        this.#pess_id = pess_id;
        this.#ani_id = ani_id;
        this.#ado_dataCria = ado_dataCria;
        this.#ado_dataAtualiza = ado_dataAtualiza;

    }

    // Funções

    async listarAdocao() {

        let sql = "select * from tb_adocao";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AdocaoModel(rows[i]["ado_id"], rows[i]["pess_id"], rows[i]["ani_id"], rows[i]["ado_dataCria"], rows[i]["ado_dataAtualiza"]));
        }

        return lista;

    }

    async obterAdoId(id) {

        let sql = "select * from tb_adocao where ado_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new AdocaoModel(row["ado_id"], row["pess_id"], row["ani_id"], row["ado_dataCria"], row["ado_dataAtualiza"]);

        }

    }

}

module.exports = AdocaoModel;