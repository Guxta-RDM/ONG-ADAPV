const Database = require("../utils/database");

const banco = new Database();

class VoluntariosModel {

    #vol_id;
    #pess_id;
    #vol_dataCria;
    #vol_dataAtualiza;

    getVol_Id() {
        return this.#vol_id;
    }
    setVol_Id(value) {
        this.#vol_id = value;
    }
    getPess_Id() {
        return this.#vol_id;
    }
    setPess_Id(value) {
        this.#pess_id = value;
    }
    getVol_DataCria() {
        return this.#vol_dataCria;
    }
    setVol_DataCria(value) {
        this.#vol_dataCria = value;
    }
    getVol_DataAtualiza() {
        return this.#vol_dataAtualiza;
    }
    setVol_DataAtualiza(value) {
        this.#vol_dataAtualiza = value;
    }

    constructor(vol_id, pess_id, vol_dataCria, vol_dataAtualiza) {
        this.#vol_id = vol_id;
        this.#pess_id = pess_id;
        this.#vol_dataCria = vol_dataCria;
        this.#vol_dataAtualiza = vol_dataAtualiza;
    }

    async listarVoluntarios() {
        let sql = "SELECT * FROM tb_voluntarios";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new VoluntariosModel(
                rows[i]["vol_id"],
                rows[i]["pess_id"],
                rows[i]["vol_dataCria"],
                rows[i]["vol_dataAtualiza"]
            ));
        }

        return lista;
    }

    async obterVolId(id) {
        let sql = "SELECT * FROM tb_voluntarios WHERE vol_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new VoluntariosModel(
                row["vol_id"],
                row["pess_id"],
                row["vol_dataCria"],
                row["vol_dataAtualiza"]
            );
        }
    }

}

module.exports = VoluntariosModel;