const Database = require("../utils/database");

const banco = new Database();

class AnimaisModel {

    #ani_id;
    #ani_nome;
    #ani_nascimento;
    #ani_raça;
    #ani_sexo;
    #ani_especie;
    #ani_pelagem;
    #ani_estado;
    #ani_dataCria;
    #ani_dataAtualiza;


    // Getters
    get_aniId() { return this.#ani_id }

    get_AniNome() { return this.#ani_nome }

    get_AniNascimento() { return this.#ani_nascimento }

    get_AniRaça() { return this.#ani_raça }

    get_AniSexo() { return this.#ani_sexo }

    get_AniEspecie() { return this.#ani_especie }

    get_AniPelagem() { return this.#ani_pelagem }

    get_AniEstado() { return this.#ani_estado }

    get_AniDataCria() { return this.#ani_dataCria }

    get_AniDataAtualiza() { return this.#ani_dataAtualiza }

    // Setters
    set ani_id(ani_id) {
        this.#ani_id = ani_id;
    }

    set ani_nome(ani_nome) {
        this.#ani_nome = ani_nome;
    }

    set ani_nascimento(ani_nascimento) {
        this.#ani_nascimento = ani_nascimento;
    }

    set ani_raça(ani_raça) {
        this.#ani_raça = ani_raça;
    }

    set ani_sexo(ani_sexo) {
        this.#ani_sexo = ani_sexo;
    }

    set ani_especie(ani_especie) {
        this.#ani_especie = ani_especie;
    }

    set ani_pelagem(ani_pelagem) {
        this.#ani_pelagem = ani_pelagem;
    }

    set ani_estado(ani_estado) {
        this.#ani_estado = ani_estado;
    }

    set ani_dataCria(ani_dataCria) {
        this.#ani_dataCria = ani_dataCria;
    }

    set ani_dataAtualiza(ani_dataAtualiza) {
        this.#ani_dataAtualiza = ani_dataAtualiza;
    }

    constructor(ani_id, ani_nome, ani_nascimento, ani_raça, ani_sexo, ani_especie, ani_pelagem, ani_estado, ani_dataCria, ani_dataAtualiza) {
        this.#ani_id = ani_id;
        this.#ani_nome = ani_nome;
        this.#ani_nascimento = ani_nascimento;
        this.#ani_raça = ani_raça;
        this.#ani_sexo = ani_sexo;
        this.#ani_especie = ani_especie;
        this.#ani_pelagem = ani_pelagem;
        this.#ani_estado = ani_estado;
        this.#ani_dataCria = ani_dataCria;
        this.#ani_dataAtualiza = ani_dataAtualiza;
    }

    async listarAnimais() {
        let sql = "SELECT * FROM tb_animais";
        let rows = await banco.ExecutaComando(sql);
        let lista = [];

        for (let i = 0; i < rows.length; i++) {
            lista.push(new AnimaisModel(
                rows[i]["ani_id"],
                rows[i]["ani_nome"],
                rows[i]["ani_nascimento"],
                rows[i]["ani_raça"],
                rows[i]["ani_sexo"],
                rows[i]["ani_especie"],
                rows[i]["ani_pelagem"],
                rows[i]["ani_estado"],
                rows[i]["createdAt"],
                rows[i]["updateAt"]
            ));
        }

        return lista;
    }

    async obterAnimId(id) {
        let sql = "SELECT * FROM tb_animais WHERE ani_id = ?";
        let val = [id];
        let rows = await banco.ExecutaComando(sql, val);

        if (rows.length > 0) {
            let row = rows[0];
            return new AnimaisModel(
                row["ani_id"],
                row["ani_nome"],
                row["ani_nascimento"],
                row["ani_raça"],
                row["ani_sexo"],
                row["ani_especie"],
                row["ani_pelagem"],
                row["ani_estado"],
                row["createdAt"],
                row["updateAt"]
            );
        }
    }
}

module.exports = AnimaisModel;