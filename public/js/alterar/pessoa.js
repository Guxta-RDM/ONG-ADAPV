document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnAlterar").addEventListener("click", alterar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("cpf").style["border-color"] = "#ced4da";
        document.getElementById("rg").style["border-color"] = "#ced4da";
        document.getElementById("dataNasc").style["border-color"] = "#ced4da";
        document.getElementById("nacio").style["border-color"] = "#ced4da";
        document.getElementById("gene").style["border-color"] = "#ced4da";
        document.getElementById("telefone").style["border-color"] = "#ced4da";
        // document.getElementById("endId").style["border-color"] = "#ced4da";
    }

    function alterar() {
        limparValidacao();

        let id = document.querySelector("#id").value;
        let nome = document.querySelector("#nome").value;
        let cpf = document.querySelector("#cpf").value;
        let rg = document.querySelector("#rg").value;
        let dataNascimento = document.querySelector("#dataNasc").value;
        let nacionalidade = document.querySelector("#nacio").value;
        let genero = document.querySelectorAll("#gene").value;
        let telefone = document.querySelector("#telefone").value;
        let idEndereco = document.querySelector("#endId").value;

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
        if (dataNascimento === "") {
            listaErros.push("dataNasc");
        }
        if (nacionalidade === "") {
            listaErros.push("nacio");
        }
        if (genero === "") {
            listaErros.push("gene");
        }
        if (telefone === "") {
            listaErros.push("telefone");
        }
        // if (idEndereco === "") {
        //     listaErros.push("endId");
        // }

        if (listaErros.length == 0) {

            let obj = {

                id: id,
                nome: nome,
                cpf: cpf,
                rg: rg,
                dataNascimento: dataNascimento,
                nacionalidade: nacionalidade,
                genero: genero,
                telefone: telefone,
                idEndereco: idEndereco

            }

            fetch("/pessoa/alterar", {
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
                        alert(r.msg);
                        window.location.href = "/pessoa/listar";
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