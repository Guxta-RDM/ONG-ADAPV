const Database = require("../utils/database");

const banco = new Database();

class ProjetosModel {

    #pro_id;
    #pro_nome;
    #pro_data;
    #pro_desc;
    #ativ_id;
    #emp_id;
    #pro_dataCria;
    #pro_dataAtualiza;

    // Getters
    getPro_id() {
        return this.#pro_id;
    }

    getPro_nome() {
        return this.#pro_nome;
    }

    getPro_data() {
        return this.#pro_data;
    }

    getPro_desc() {
        return this.#pro_desc;
    }

    getAtiv_id() {
        return this.#ativ_id;
    }

    getPro_dataCria() {
        return this.#pro_dataCria;
    }

    getPro_dataAtualiza() {
        return this.#pro_dataAtualiza;
    }

    // Setters
    setPro_id(pro_id) {
        this.#pro_id = pro_id;
    }

    setPro_nome(pro_nome) {
        this.#pro_nome = pro_nome;
    }

    setPro_data(pro_data) {
        this.#pro_data = pro_data;
    }

    setPro_desc(pro_desc) {
        this.#pro_desc = pro_desc;
    }

    setAtiv_id(ativ_id) {
        this.#ativ_id = ativ_id;
    }

    setPro_dataCria(pro_dataCria) {
        this.#pro_dataCria = pro_dataCria;
    }

    setPro_dataAtualiza(pro_dataAtualiza) {
        this.#pro_dataAtualiza = pro_dataAtualiza;
    }

    constructor(pro_id, pro_nome, pro_data, pro_desc, ativ_id, emp_id, pro_dataCria, pro_dataAtualiza) {
        this.#pro_id = pro_id;
        this.#pro_nome = pro_nome;
        this.#pro_data = pro_data;
        this.#pro_desc = pro_desc;
        this.#ativ_id = ativ_id;
        this.#emp_id = emp_id;
        this.#pro_dataCria = pro_dataCria;
        this.#pro_dataAtualiza = pro_dataAtualiza;
    }

    async listarProjetos() {
        let sql = "SELECT * FROM tb_projetos";

        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new PessoaModel(
                rows[i]["pro_id"],
                rows[i]["pro_nome"],
                rows[i]["pro_data"],
                rows[i]["pro_desc"],
                rows[i]["ativ_id"],
                rows[i]["pro_dataCria"],
                rows[i]["pro_dataAtualiza"],
            ));
        }

        return lista;
    }

    async obterProId(id) {
        let sql = "SELECT * FROM tb_projetos WHERE pro_id = ?";
        let val = [id];

        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];

            return new ProjetosModel(
                row["pro_id"],
                row["pro_nome"],
                row["pro_data"],
                row["pro_desc"],
                row["ativ_id"],
                row["emp_id"],
                row["pro_dataCria"],
                row["pro_dataAtualiza"]
            );
        }
    }
}

module.exports = ProjetosModel;