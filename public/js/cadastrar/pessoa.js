document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("cpf").style["border-color"] = "#ced4da";
        document.getElementById("rg").style["border-color"] = "#ced4da";
        document.getElementById("dataNasc").style["border-color"] = "#ced4da";
        document.getElementById("nacio").style["border-color"] = "#ced4da";
        document.getElementById("gene").style["border-color"] = "#ced4da";
        document.getElementById("telefone").style["border-color"] = "#ced4da";
        document.getElementById("endId").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let rg = document.querySelector("#rg").value;
        let nasc = document.querySelector("#dataNasc").value;
        let nacio = document.querySelector("#nacio").value;
        let gene = document.querySelectorAll("#gene").value;
        let tel = document.querySelector("#telefone").value;
        let endId = document.querySelector("#endId").value;

        let listaErros = [];

        if (nome === "") {
            listaErros.push("nome");
        }
        if (cpf === "") {
            listaErros.push("cpf");
        }
        if (rg === "") {
            listaErros.push("rg");
        }
        if (nasc === "") {
            listaErros.push("dataNasc");
        }
        if (nacio === "") {
            listaErros.push("nacio");
        }
        if (gene === "") {
            listaErros.push("gene");
        }
        if (tel === "") {
            listaErros.push("telefone");
        }
        // if (endId === "") {
        //     listaErros.push("endId");
        // }

        if (listaErros.length == 0) {

            let obj = {
                nome: nome,
                cpf: cpf,
                rg: rg,
                nasc: nasc,
                nacio: nacio,
                gene: gene,
                tel: tel,
                // endId: endId
            };

            fetch("/pessoa/cadastrar", {
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