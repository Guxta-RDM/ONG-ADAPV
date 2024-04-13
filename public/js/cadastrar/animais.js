document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("nome").style["border-color"] = "#ced4da";
        document.getElementById("sexo").style["border-color"] = "#ced4da";
        document.getElementById("ester").style["border-color"] = "#ced4da";
        document.getElementById("campoData").style["border-color"] = "#ced4da";
        document.getElementById("especie").style["border-color"] = "#ced4da";
        document.getElementById("estado").style["border-color"] = "#ced4da";
        document.getElementById("raca").style["border-color"] = "#ced4da";
        document.getElementById("pelagem").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();
        let nome = document.querySelector("#nome").value;
        let sexo = document.querySelector("#sexo").value;
        let ester = document.querySelector("#ester").value;
        let campoData = document.querySelector("#campoData").value;
        let especie = document.querySelector("#especie").value;
        let estado = document.querySelector("#estado").value;
        let raca = document.querySelector("#raca").value;
        let pelagem = document.querySelector("#pelagem").value;

        let listaErros = [];
        if(nome === "") {
            listaErros.push("nome");
        }
        if(sexo === "") {
            listaErros.push("sexo");
        }
        if(ester === "") {
            listaErros.push("ester");
        }
        if(campoData === "") {
            listaErros.push("campoData");
        }
        if(especie === "") {
            listaErros.push("especie");
        }
        if(estado === "") {
            listaErros.push("estado");
        }
        if(raca === "") {
            listaErros.push("raca");
        }
        if(pelagem === "") {
            listaErros.push("pelagem");
        }
        

        if(listaErros.length == 0) {
            //enviar ao backend com fetch

            let obj = {
                nome: nome,
                sexo: sexo,
                ester: ester,
                campoData: campoData,
                especie: especie,
                estado: estado,
                raca: raca,
                pelagem: pelagem
            };
            

            fetch("/animais/cadastrar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(r=> {
                return r.json();
            })
            .then(r=> {
                if(r.ok) {
                    window.location.href="/";
                }   
                else {
                    alert(r.msg);
                }
            })
        }
        else{
            //avisar sobre o preenchimento incorreto
            for(let i = 0; i < listaErros.length; i++) {
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }
    }

})