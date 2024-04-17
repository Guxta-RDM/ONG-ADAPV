const Database = require("../utils/database");

const banco = new Database();

class AdocaoModel {

    #ado_id;
    #pess_id;
    #ani_id;
    #createdAt;
    #updatedAt;

    // Getters

    get AdoId() { return this.#ado_id }

    get PessId() { return this.#pess_id }

    get AniId() { return this.#ani_id }

    get createdAt() { return this.#createdAt }

    get updatedAt() { return this.#updatedAt }

    // Setters

    set AdoId(newAdoId) { this.#ado_id = newAdoId }

    set createdAt(newcreatedAt) { this.#createdAt = newcreatedAt }

    set updatedAt(newupdatedAt) { this.#updatedAt = newupdatedAt }

    set PessId(newId) { this.#pess_id = newId }

    set AniId(newId) { this.#ani_id = newId }

    constructor(ado_id, pess_id, ani_id, createdAt, updatedAt) {

        this.#ado_id = ado_id;
        this.#pess_id = pess_id;
        this.#ani_id = ani_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Funções

    async listarAdocao() {

        let sql = "SELECT * FROM tb_adocao";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AdocaoModel(
                rows[i]["ado_id"],
                rows[i]["pess_id"],
                rows[i]["ani_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"]
            ));
        }

        return lista;

    }

    async obterAdoId(id) {

        let sql = "SELECT * FROM tb_adocao WHERE ado_id = ?";

        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new AdocaoModel(
                row["ado_id"],
                row["pess_id"],
                row["ani_id"],
                row["createdAt"],
                row["updatedAt"]
            );

        }

    }

    async criarAdocao() {
        if (this.#ado_id == 0) {
            let sql = "INSERT INTO tb_adocao (pess_id, ani_id, createdAt, updatedAt) VALUES (?,?,?,?)";

            let valores = [this.#pess_id, this.#ani_id, this.#createdAt, this.#updatedAt];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editarAdocao() {
        let sql = "UPDATE tb_adocao SET pess_id = ?, ani_id = ?, createdAt = ?, updatedAt = ? WHERE ado_id = ?"

        let valores = [this.#pess_id, this.#ani_id, this.#createdAt, this.#updatedAt, this.#ado_id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluirAdocao(id) {

        let sql = "DELETE FROM tb_adocao WHERE ado_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

}

module.exports = AdocaoModel;