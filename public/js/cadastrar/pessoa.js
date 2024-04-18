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
            listaErros.push("dataNascimento");
        }
        if (nacionalidade === "") {
            listaErros.push("nacionalidade");
        }
        if (genero === "") {
            listaErros.push("genero");
        }
        if (telefone === "") {
            listaErros.push("telefone");
        }
        if (idEndereco === "") {
            listaErros.push("idEndereco");
        }

        if (listaErros.length == 0) {

            let obj = {
                nome: nome,
                cpf: cpf,
                rg: rg,
                dataNascimento: dataNascimento,
                nacionalidade: nacionalidade,
                genero: genero,
                telefone: telefone,
                idEndereco: idEndereco
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
