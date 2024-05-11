document.addEventListener("DOMContentLoaded", function () {

    document.getElementById("btnCadastrar").addEventListener("click", cadastrar);

    function limparValidacao() {
        document.getElementById("patrim_saldo").style["border-color"] = "#ced4da";
        document.getElementById("doa_id").style["border-color"] = "#ced4da";
    }

    function cadastrar(){
        limparValidacao();

        let patrim_saldo = document.querySelector("#patrim_saldo").value;
        let doa_id = document.querySelector("#doa_id").value;
        

        let listaErros = [];
        if(patrim_saldo === "" && doa_id === ""){
            if(patrim_saldo === ""){
                listaErros.push("patrim_saldo");
            }
            if(doa_id === ""){
                listaErros.push("doa_id");
            }
        }

        if (listaErros.length == 0){

            let obj = {
                saldo: patrim_saldo,
                doa_id: doa_id
            }

            fetch("/patrimonio/cadastrar", {
                method: 'POST',
                body: JSON.stringify(obj),
                headers: {
                    "Content-Type" : "application/json",
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
            for (let i = 0; i <listaErros.length; i++){
                let campos = document.getElementById(listaErros[i]);
                campos.style["border-color"] = "red";
            }
            alert("Preencha corretamente os campos indicados!");
        }


    }

})