export function valida(input) {
    // variável que acessa o dataAtribuites do valor input, recebidos
    // no argumento.
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

}

    //Objeto 
const validadores = {
    dataNascimento:input => validaDataNascimento(input)
}



// const dataNascimento = document.querySelector("#nascimento")

// dataNascimento.addEventListener('blur', (evento) => {
//     validaDataNascimento(evento.target)
// })

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)

    
    let mensagem = ""

    if(!maiorQue18(dataRecebida)) {
        // Quando chega aqui, o javascript verifica se a data do input é valida 
        // para pessoas maiores de 18 anos. Quando o resultado for false ele exibirá
        // a mensagem abaixo.
        mensagem = "Você precisa ser maior que 18 anos para concluir o cadastro."
    }

    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataAtual = new Date() 
    // será a data corrente no momento do cadastro.

    const dataMais18 = new Date(
        data.getUTCFullYear() + 18,
        data.getUTCMonth(),
        data.getUTCDate()
    ); // soma a data do input mais 18, na soma o resultado deve ser <= (menor igual) a data atual
        // para que seja maior que 18 anos de idade.

        return dataMais18 <= dataAtual
}