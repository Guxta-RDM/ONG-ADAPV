const Database = require("../utils/database");
const PessoaModel = require("./pessoaModel");

const banco = new Database();

class CtrlSaidaEventoModel {

    #ctrlEven_id
    #ctrlEven_desc
    #ctrlEven_estado
    #createdAt
    #updatedAt
    #prodSaida_id
    #prodSaida_qnt
    #prodEntrada_id
    #prodEntrada_qnt
    #even_id


    // Getters

    get ctrlEven_id() { return this.#ctrlEven_id }
    get ctrlEven_desc() { return this.#ctrlEven_desc }
    get ctrlEven_estado() { return this.#ctrlEven_estado }
    get createdAt() { return this.#createdAt }
    get updatedAt() { return this.#updatedAt }
    get prodSaida_id() { return this.#prodSaida_id }
    get prodSaida_qnt() { return this.#prodSaida_qnt }
    get prodEntrada_id() { return this.#prodEntrada_id }
    get prodEntrada_qnt() { return this.#prodEntrada_qnt }
    get even_id() { return this.#even_id }

    // Setters

    set ctrlEven_id(value) { this.#ctrlEven_id = value }
    set ctrlEven_desc(value) { this.#ctrlEven_desc = value }
    set ctrlEven_estado(value) { this.#ctrlEven_estado = value }
    set createdAt(value) { this.#createdAt = value }
    set updatedAt(value) { this.#updatedAt = value }
    set prodSaida_id(value) { this.#prodSaida_id = value }
    set prodSaida_qnt(value) { this.#prodSaida_qnt = value }
    set prodEntrada_id(value) { this.#prodEntrada_id = value }
    set prodEntrada_qnt(value) { this.#prodEntrada_qnt = value }
    set even_id(value) { this.#even_id = value }

    // Constructor

    constructor(ctrlEven_id, ctrlEven_desc, ctrlEven_estado, createdAt, updatedAt, prodSaida_id, prodSaida_qnt, prodEntrada_id, prodEntrada_qnt, even_id) {
        this.#ctrlEven_id = ctrlEven_id;
        this.#ctrlEven_desc = ctrlEven_desc;
        this.#ctrlEven_estado = ctrlEven_estado;
        this.#createdAt = createdAt;
        this.#updatedAt = updatedAt;
        this.#prodSaida_id = prodSaida_id;
        this.#prodSaida_qnt = prodSaida_qnt;
        this.#prodEntrada_id = prodEntrada_id;
        this.#prodEntrada_qnt = prodEntrada_qnt;
        this.#even_id = even_id;
    }

    // Métodos

    async listar() {
        let sql = "SELECT * FROM tb_ctrlSaidaEvento";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new CtrlSaidaEventoModel(
                rows[i]["ctrlEven_id"],
                rows[i]["ctrlEven_desc"],
                rows[i]["ctrlEven_estado"],
                rows[i]["createdAt"],
                rows[i]["updatedAt"],
                rows[i]["prodSaida_id"],
                rows[i]["prodSaida_qnt"],
                rows[i]["prodEntrada_id"],
                rows[i]["prodEntrada_qnt"],
                rows[i]["even_id"]
            ));
        }

        return lista;
    }
    
    async obterId(id) {
        let sql = "SELECT * FROM tb_ctrlSaidaEvento WHERE ctrlEven_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new CtrlSaidaEventoModel(
                row["ctrlEven_id"],
                row["ctrlEven_desc"],
                row["ctrlEven_estado"],
                row["createdAt"],
                row["updatedAt"],
                row["prodSaida_id"],
                row["prodSaida_qnt"],
                row["prodEntrada_id"],
                row["prodEntrada_qnt"],
                row["even_id"]
            );
        }
    }

    async cadastrar() {
        if (this.#ctrlEven_id === 0) {
            let sql = "INSERT INTO tb_ctrlSaidaEvento (ctrlEven_desc, ctrlEven_estado, createdAt, updatedAt, prodSaida_id, prodSaida_qnt, prodEntrada_id, prodEntrada_qnt, even_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

            let valores = [
                this.#ctrlEven_desc,
                this.#ctrlEven_estado,
                this.#createdAt,
                this.#updatedAt,
                this.#prodSaida_id,
                this.#prodSaida_qnt,
                this.#prodEntrada_id,
                this.#prodEntrada_qnt,
                this.#even_id
            ];

            let result = await banco.ExecutaComandoNonQuery(sql, valores);

            return result;
        }
    }

    async editar() {
        let sql = "UPDATE tb_ctrlSaidaEvento SET ctrlEven_desc = ?, ctrlEven_estado = ?, createdAt = ?, updatedAt = ?, prodSaida_id = ?, prodSaida_qnt = ?, prodEntrada_id = ?, prodEntrada_qnt = ?, even_id = ? WHERE ctrlEven_id = ?";

        let valores = [
            this.#ctrlEven_desc,
            this.#ctrlEven_estado,
            this.#createdAt,
            this.#updatedAt,
            this.#prodSaida_id,
            this.#prodSaida_qnt,
            this.#prodEntrada_id,
            this.#prodEntrada_qnt,
            this.#even_id,
            this.#ctrlEven_id
        ];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

    async excluir(id) {
        let sql = "DELETE FROM tb_ctrlSaidaEvento WHERE ctrlEven_id = ?";

        let valores = [id];

        let result = await banco.ExecutaComandoNonQuery(sql, valores);

        return result;
    }

}

module.exports = CtrlSaidaEventoModel;