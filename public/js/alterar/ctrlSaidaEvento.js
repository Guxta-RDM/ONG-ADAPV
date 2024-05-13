document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    function limparValidacao() {
        document.getElementById("ctrlEven_desc").style["border-color"] = "#ced4da";
        document.getElementById("ctrlEven_estado").style["border-color"] = "#ced4da";
        document.getElementById("prodSaida_id").style["border-color"] = "#ced4da";
        document.getElementById("prodSaida_qnt").style["border-color"] = "#ced4da";
        document.getElementById("prodEntrada_id").style["border-color"] = "#ced4da";
        document.getElementById("prodEntrada_qnt").style["border-color"] = "#ced4da";
        document.getElementById("even_id").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();
        let id = document.querySelector("#id").value;
        let desc = document.querySelector("#ctrlEven_desc").value;
        let estado = document.querySelector("#ctrlEven_estado").value;
        let prodSaida_id = document.querySelector("#prodSaida_id").value;
        let prodSaida_qnt = document.querySelector("#prodSaida_qnt").value;
        let prodEntrada_id = document.querySelector("#prodEntrada_id").value;
        let prodEntrada_qnt = document.querySelector("#prodEntrada_qnt").value;
        let evento = document.querySelector("#even_id").value;
        let createdAt = document.querySelector("#createdAt").value;

        let listaErros = [];

        if (desc === "") {
            listaErros.push("ctrlEven_desc");
        }
        if (estado === "") {
            listaErros.push("ctrlEven_estado");
        }
        if (prodSaida_id === "") {
            listaErros.push("prodSaida_id");
        }
        if (prodSaida_qnt === "") {
            listaErros.push("prodSaida_qnt");
        }
        if (prodEntrada_id === "") {
            listaErros.push("prodEntrada_id");
        }
        if (prodEntrada_qnt === "") {
            listaErros.push("prodEntrada_qnt");
        }
        if (evento === "") {
            listaErros.push("even_id");
        }

        if (listaErros.length == 0) {

            let obj = {
                id: id,
                desc: desc,
                estado: estado,
                prodSaida_id: prodSaida_id,
                prodSaida_qnt: prodSaida_qnt,
                prodEntrada_id: prodEntrada_id,
                prodEntrada_qnt: prodEntrada_qnt,
                even_id: evento,
                createdAt: createdAt
            };

            fetch("/ctrlSaidaEvento/alterar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then(r => {
                    return r.json();
                })
                .then(r => {
                    if (r.ok) {
                        window.location.href = "/";
                    }
                    else {
                        alert(r.msg);
                    }
                })

        }
        else {
            for (let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }


})