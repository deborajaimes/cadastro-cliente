let produtos = []

export default {
    salvar: (produto) => {
        produtos.push(produto)
    },
    remover: (index) => {
        produtos.splice(index, 1)
    },
    listar: () => {
        return produtos
    },
    buscarNomeProduto: (textoBusca) =>{
        return produtos.filter((elemento) =>{
            return elemento.nome.toUpperCase().includes(textoBusca.toUpperCase())
        })
    }
}
