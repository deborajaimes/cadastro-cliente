import cliente from "./cliente.js"
import produto from "./produto.js"
import cep from "./cep.js"



let btnSalvarCliente = document.getElementById("btnSalvarCliente")
let btnSalvarProduto = document.getElementById("btnSalvarProduto")
let inputCep = document.getElementById("cep")
let inputRua = document.getElementById("rua")
let inputBairro = document.getElementById("bairro")
let inputCidade = document.getElementById("cidade")
let inputEstado = document.getElementById("estado")
let inputBuscaCliente = document.getElementById("inputBuscaCliente")
let inputBuscaProduto = document.getElementById("inputBuscaProduto")

inputBuscaProduto.addEventListener("input", () =>{
    if(inputBuscaProduto.value.length >3){
        let resultado = produto.buscarNomeProduto(inputBuscaProduto.value)
        criarTabelaProduto(resultado)
    } else {
        let produtos = produto.listar()
        criarTabelaProduto(produtos)
    }
})

inputBuscaCliente.addEventListener("input",  () => {
    if(inputBuscaCliente.value.length >3){
      let resultado = cliente.buscarPorNome(inputBuscaCliente.value)
      criarTabelaCliente(resultado)
    } else{
        let clientes = cliente.listar()
        criarTabelaCliente(clientes)
    }
})

inputCep.addEventListener("input", async () => {
    if(inputCep.value.length == 8){
     let resultado = await cep.buscarPorCep(inputCep.value)
     inputRua.value = resultado.logradouro
     inputBairro.value = resultado.bairro
     inputCidade.value = resultado.localidade
     inputEstado.value = resultado.uf
    }
})


btnSalvarCliente.addEventListener("click", () => { // Arrow function
    let novoCliente = {}
    novoCliente.nome = document.getElementById("nome").value
    novoCliente.email = document.getElementById("email").value
    novoCliente.cpf = document.getElementById("cpf").value
    novoCliente.cep = inputCep.value
    novoCliente.rua = inputRua.value
    novoCliente.bairro = inputBairro.value
    novoCliente.cidade = inputCidade.value
    novoCliente.estado = inputEstado.value
    cliente.salvar(novoCliente)
    let clientes = cliente.listar()
    criarTabelaCliente(clientes)
})

btnSalvarProduto.addEventListener("click", () => {
    let novoProduto = {}
    novoProduto.nome = document.getElementById("produtoNome").value
    novoProduto.descricao = document.getElementById("produtoDescricao").value
    novoProduto.quantidade = document.getElementById("produtoQuantidade").value
    produto.salvar(novoProduto)
    let produtos = produto.listar()
    criarTabelaProduto(produtos)
})

function criarTabelaCliente(clientes) {
    let tabela = document.getElementById("tabelaCliente")
    tabela.innerHTML = "" // zerar a tabela

    for(let clienteAtual of clientes) {
        tabela.innerHTML += `
        <tr>
            <td>${clienteAtual.nome}</td>
            <td>${clienteAtual.email}</td>
            <td>${clienteAtual.cpf}</td>
            <td>${clienteAtual.cep}</td>
            <td>${clienteAtual.rua}</td>
            <td>${clienteAtual.bairro}</td>
            <td>${clienteAtual.cidade}</td>
            <td>${clienteAtual.estado}</td>
            <td>
                <button class="exclui-cliente">Excluir</button>
            </td>
        </tr>
        `
    }

    let btnsExcluir = document.querySelectorAll(".exclui-cliente")
    for(let [index, btnAtual] of btnsExcluir.entries()) {
        btnAtual.addEventListener("click", () => {
            cliente.remover(index)
            let clientes = cliente.listar()
            criarTabelaCliente(clientes)
        })
    }
}

function criarTabelaProduto(produtos) {
    let tabela = document.getElementById("tabelaProduto")
    tabela.innerHTML = "" // zerar a tabela
    
    for(let produtoAtual of produtos) {
        tabela.innerHTML += `
        <tr>
            <td>${produtoAtual.nome}</td>
            <td>${produtoAtual.descricao}</td>
            <td>${produtoAtual.quantidade}</td>
            <td>
                <button class="exclui-produto">Excluir</button>
            </td>
        </tr>
        `
    }

    let btnsExcluir = document.querySelectorAll(".exclui-produto")
    for(let [index, btnAtual] of btnsExcluir.entries()) {
        btnAtual.addEventListener("click", () => {
            produto.remover(index)
            let produtos = produto.listar()
            criarTabelaProduto(produtos)
        })
    }
}