export function valida(input) {
  // variável que acessa o dataAtribuites do valor input, recebidos
  // no argumento.
  const tipoDeInput = input.dataset.tipo;

  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  // Usa o validity(que retorna um ValidityState) utilizando do método valid(retorna boolean)
  // para verificar se o campo atende a todos os requesitos.

  if (input.validity.valid) {
    // Usando o parentElement, eu coloco a class no pai(container do campo selecionado).
    input.parentElement.classList.remove("input-container--invalido");
    // Buscando elemento no DOM.
    let mensagemPersonalizada = input.parentElement.querySelector(
      ".input-mensagem-erro"
    );
    // Trocando o valor do texto.
    mensagemPersonalizada.innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalido");
    // Colando mensagem personalizada dentro do span Element
    let mensagemPersonalizada = input.parentElement.querySelector(
      ".input-mensagem-erro"
    );
    mensagemPersonalizada.innerHTML = mostraMensagemDeErro(tipoDeInput, input); // tipoDeInput == dataset.tipo(busca no DOM pelo atributo do campo.)
  }
}

// Objeto de Erro, nesse objeto temos propriedades que são mensagens
// de erro, expecícica para cada campo.
const mensagensDeErro = {
  nome: {
    valueMissing: "O campo de nome não pode ser enviado vazio.",
  },
  
  email: {
    valueMissing: "O campo de email não pode ser enviado vazio.",
    typeMismatch: "O email digitado não é valido.",
  },

  senha: {
    valueMissing: "O campo de senha não pode ser enviado vazio.",
    patternMismatch: "A senha deve conter entre 6 a 12 caracteres, pelo menos uma letra maiúscula ou minúscula e não deve conter símbolos.",
  },
  data: {
    valueMissing: "O campo de data não pode ser enviado vazio.",
    customError: "Você precisa ser maior que 18 anos para concluir o cadastro.",
  },
};

//Objeto
const validadores = {
  dataNascimento: (input) => validaDataNascimento(input),
};

const tiposDeErro = [
  "valueMissing",
  "typeMismatch",
  "patterMismatch",
  "customError",
];

// const dataNascimento = document.querySelector("#nascimento")

// dataNascimento.addEventListener('blur', (evento) => {
//     validaDataNascimento(evento.target)
// })

function mostraMensagemDeErro(tipoDeInput, input) {
  let mensagem = "";

  // tipoDeErro é o array que criamos com os nomes dos erros que estamos tratando apartir do validity

  // O loop intera sobre cada nome de erro e compara com o objetos de erro mensagensDeErro()
  tiposDeErro.forEach((erro) => {
    // input(elemento no DOM) aplico o método validity e entre colchetes "[]" passo o nome de erro para comparar
    // a resposta será true ou false, que é o que precisamos na condicional.
    if (input.validity[erro]) {
      // Passando para a variável mensagem o texto que está no objeto mensagensDeErro
      // acessando o objeto pela notação de colchetes, acessa primeiro o tipoDeInput "que pode ser, nome email e etc."
      // depois acessando o texto pelo tipoDeErro.
      mensagem = mensagensDeErro[tipoDeInput][erro];
    }
  });

  return mensagem;
}

function validaDataNascimento(input) {
  const dataRecebida = new Date(input.value);

  let mensagem = "";

  if (!maiorQue18(dataRecebida)) {
    // Quando chega aqui, o javascript verifica se a data do input é valida
    // para pessoas maiores de 18 anos. Quando o resultado for false ele exibirá
    // a mensagem abaixo.
    mensagem = "Você precisa ser maior que 18 anos para concluir o cadastro.";
  }

  input.setCustomValidity(mensagem);
}

function maiorQue18(data) {
  const dataAtual = new Date();
  // será a data corrente no momento do cadastro.

  const dataMais18 = new Date(
    data.getUTCFullYear() + 18,
    data.getUTCMonth(),
    data.getUTCDate()
  ); // soma a data do input mais 18, na soma o resultado deve ser <= (menor igual) a data atual
  // para que seja maior que 18 anos de idade.

  return dataMais18 <= dataAtual;
}
