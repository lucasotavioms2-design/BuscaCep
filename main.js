// 1º passo CAPTURANDO OS ELEMENTOS DO HTML

/* 
O document representa a página HTML
getElementbyld() procura um elemento pelo seu ID 
Aqui guardamos o formulario em uma variavel para coseguir trabalhar com ele utilizando JavaScript
*/
let formCep = document.getElementById("form-cep")


let inputCep = document.getElementById("input-cep")


let resultado = document.getElementById("resultado")


// 2º Passo - IDENTIFICANDO O ENVIO DO FORMULARIO

/*
    addEventListener() permite "escutar" acontecimentos dentro da página, chamados de eventos 
    o evento "submit" acontece quando o formulário é enviado 
    
    function(event) cria uma função que recebe uma informações sobre o evento que acabou de acontecer
*/

formCep.addEventListener("submit", function(event) {


// event.preventDefalt() impede de que a página se recarregue automaticamente


event.preventDefault()


/*
3º Passo - CAPTURANDO E TRATANDO O CEP0
value acessa o conteúdo digitado dentro do imput trim() remove os espaços em branco que estejam no inicio ou final de texto

Exemplo:
" 01001000" se transforma em "01001000"
*/

const cep = inputCep.value.trim()

/*
    4º Passo - validando o Cep com expressão regular
    Uma expressão regular é uma forma de definir um padrão que o texto precisa seguir

^ indica o inicio do texto 
[0-9] permite qualquer numero de 0 até 9
{8} exige exatamente 8 números
$ indica o final do texto 
*/

const validarCep = /^[0-9]{8}$/

/*
    5º Passo - VERIFICANDO SE O CEP É VÁLIDO


    test() verifica se o texto armazenado na variavel cep corresponde ao padrão definido na espressão regular
    ! significa NÃO, estou verificando se o CEP não corresponde ao padrão esperado
*/

    if(!validarCep.test(cep)){
        resultado.innerHTML = '<p class="erro"> Por favor digite um CEP válido com 8 números. </p> '
   

    // Retorna e encerra a execução da função naquele momento

    return
}

/*
    6º PASSO - MOSTRANDO UMA MENSAGEM DE CARREGAMENTO
*/

resultado.innerHTML = "<p>Buscando...</p>"


   // 7º PASSO - CONSUMIR A API VIA CEP 

   /*
   API é uma forma de um sistema conversar com o outro, para solicitar ou compartilhar informações
   
   fetch() é um recurso de JavaScript utilizado para fazer requisições a endereços externos, como   APIs
   */

   fetch(`https://viacep.com.br/ws/${cep}/json/`)

    /* 8º PASSO - TRANSFORMANDO A RESPOSTA EM JSON
    
        .then() permite definir o que será executado quando a etapa anterior for concluida 
    */

    .then(response => response.json())

    /* 9º Passo - REBENDO OS DADOS DE ENDEREÇO
    Aqui recebemos os dados que vierem do API
    A variavel data guarda as informações do endereço, como CEP, rua, bairro, cidade e estado 
    
    */

    .then(data => {
        /* 10º PASSO - VERIFICANDO SE O CEP FOI ENCONTRADOS
        
        A API ViaCep retorna uma propriedade erro quando é encontrado.

        */
       if(data.erro){
            resultado.innerHTML = '<p class="erro"> CEP não encontrado animal</p>'
            return
       }

       /*
        11º MOSTRAR OS DADOS NA TELA       
       */
      resultado.innerHTML = `
      <h2>Resultado</h2>

      <p><strong>CEP:</strong>${data.cep}</p>
      <p><strong>Logradouro:</strong>${data.logradouro || "Não informado"}</p>
      <p><strong>Bairro:</strong>${data.bairro || "Não informado"}</p>
      <p><strong>Cidade:</strong>${data.cidade || "Não informado"}</p>
      <p><strong>Estado:</strong>${data.estado || "Não informado"}</p>
      `

    })
    .catch(() =>{
        resultado.innerHTML = '<p class="erro"> Erro ao buscar o CEP. Tente novamente mais tarde</p>'
    })
})
