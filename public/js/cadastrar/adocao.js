document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("IdAdotante").style["border-color"] = "#ced4da";
        document.getElementById("IdAnimal").style["border-color"] = "#ced4da";
    }

    function cadastrar() {
        limparValidacao();

        let adotante = document.querySelector("#IdAdotante").value;
        let animal = document.querySelector("#IdAnimal").value;

        console.log(adotante.value);
        console.log(animal.value);

        let listaErros = [];

        if (adotante == 0) {
            listaErros.push("IdAdotante");
        }

        if (animal == 0) {
            listaErros.push("IdAnimal");
        }

        if (listaErros.length == 0) {

            let obj = {
                adotante: adotante,
                animal: animal
            };

            console.log(obj.adotante + " - " + obj.animal);

            fetch("/adocao/cadastrar", {
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