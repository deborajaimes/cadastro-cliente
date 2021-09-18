export default {
    buscarPorCep: async (cep) => {
        let resultado = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
        return resultado.data
    }
}