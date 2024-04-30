document.addEventListener("DOMContentLoaded", function() {

    let btns = document.querySelectorAll(".btnExclusao");

    for (let i = 0; i<btns.length; i++){
        btns[i].addEventListener("click", excluir);
    }

    function excluir() {
        let id = this.dataset.codigoexclusao;

        if (id != null) {
            if (confirm("Tem certeza de que deseja excluir o registro desse projeto?")) {
                let obj = {
                    id: id
                }

                fetch('/projeto/excluir', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(obj)
                })
                    .then(r => {
                        return r.json()
                    })
                    .then(r => {
                        if (r.ok) {
                            window.location.reload();
                        }
                        else {
                            alert(r.msg);
                        }
                    })
            }
        }
        else {
            alert("Nenhum ID encontrado para exclusão");
        }
    }

})