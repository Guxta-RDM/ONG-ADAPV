const Database = require("../utils/database");

const banco = new Database();

class PatrimonioModel {

    #patrim_id;
    #patrim_saldo;
    #doa_id;
    #createdAt;
    #updatedAt;

    // Getters

    get patrim_id() { return this.#patrim_id }
    get patrim_saldo() { return this.#patrim_saldo }
    get doa_id() { return this.#doa_id }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }

    // Setters

    set patrim_id(value) { this.#patrim_id = value }
    set patrim_saldo(value) { this.#patrim_saldo = value }
    set doa_id(value) { this.#doa_id = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }

    // Constructor

    constructor(patrim_id, patrim_saldo, doa_id, createdAt, updatedAt) {

        this.#patrim_id = patrim_id;
        this.#patrim_saldo = patrim_saldo;
        this.#doa_id = doa_id;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;

    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_patrimonio";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new PatrimonioModel(
                rows[i]["patrim_id"],
                rows[i]["patrim_saldo"],
                rows[i]["doa_id"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
            ));
        }

        return lista;
    }

    async obterId(id) {
        let sql = "SELECT * FROM tb_patrimonio WHERE patrim_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new PatrimonioModel(
                row["patrim_id"],
                row["patrim_saldo"],
                row["doa_id"],
                row["createdAt"],
                row["updatedAt"]
            );
        }
    }

    async cadastrar() {
        if (this.#patrim_id === 0) {
            let sql = "INSERT INTO tb_patrimonio (patrim_saldo, doa_id, createdAt, updatedAt) VALUES (?, ?, ?, ?)";

            let valores = [
                this.#patrim_saldo,
                this.#doa_id,
                this.#createdAt,
                this.#updatedAt
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_patrimonio SET patrim_saldo = ?, doa_id = ?, createdAt = ?, updatedAt = ? WHERE patrim_id = ?";

        let valores = [
            this.#patrim_saldo,
            this.#doa_id,
            this.#createdAt,
            this.#updatedAt,
            this.#patrim_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {

        let sql = "DELETE FROM tb_patrimonio WHERE patrim_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;

    }

}

module.exports = PatrimonioModel;