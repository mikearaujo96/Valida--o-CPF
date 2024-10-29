let div_input = document.querySelector('.div-input');
let input_cpf = document.getElementById('input_cpf');
let btn_input = document.getElementById('btn');
let res_na_tela = document.getElementById('res_na_tela');


/*    
ESTE EVENTO CONTEM 4 SCRIPTS: 
    | 1° FORMATA CPF Exemplo: ###.###.###-##  
    | 2° É UMA FUNÇAO QUE INVALIDA NUMEROS SEQUENCIAIS Exemplo: 111.111, 222.222, 333.333,
    | 3° É UMA FUNÇÃO QUE VALIDA O PRIMEIRO DIGITO VERIFICADOR
    | 4° É UMA FUNÇÃO QUE VALIDA O SEGUNDO DIGITO VERIFICADOR
*/
input_cpf.addEventListener('input', () => {
    let valor_input = input_cpf.value.replace(/\D/g, '');
    let formatacao_vazia = '';

    // MASCARA CPF DIGITO A DIGITO
    if (valor_input.length > 0) {
        formatacao_vazia = valor_input.substring(0, 3);
    }
    if (valor_input.length > 3) {
        formatacao_vazia += '.' + valor_input.substring(3, 6);
    }
    if (valor_input.length > 6) {
        formatacao_vazia += '.' + valor_input.substring(6, 9);
    }
    if (valor_input.length > 9) {
        formatacao_vazia += '-' + valor_input.substring(9, 11);
    }
    input_cpf.value = formatacao_vazia;

    // INICIA AS VALIDAÇÕES
    btn_input.addEventListener('click', () => {

        let cpf = input_cpf.value.replace(/\D/g, '');
        let digito = 0;
        let digitoX = 0;
        let cpf_convertido = cpf.toString();
        verificar_cpf_invalido()

        // ELIMINA NUMEROS SEQUENCIAIS
        function verificar_cpf_invalido() {

            let lista_negra = []

            for (let i = 0; i < 10; i++) {

                let new_cpf = i.toString().repeat(11)
                lista_negra.push(new_cpf);
            }

            if (lista_negra.includes(cpf)) {
                res_na_tela.innerHTML = `CPF INVALIDO!`
                div_input.style.border = "1px solid rgb(167, 3, 3)"
            } else {
                verificar_primeiro_digito()
            }
        }

        // VERIFICA O PRIMEIRO DIGITO VERIFICADOR        
        function verificar_primeiro_digito() {
            let resultados = []

            for (let i = 10; i > 1; i--) {

                let digitoCpf = cpf_convertido[digito++];
                let resultado = digitoCpf * i;
                resultados.push(resultado);
            }

            let somar_array = resultados.reduce((valorAcumulado, valorAtual) => valorAcumulado + valorAtual, 0);
            let calculo_verificacao = (somar_array * 10) % 11;

            if (calculo_verificacao == cpf_convertido[9]) {
                verificar_segundo_digito()
            } else {
                res_na_tela.innerHTML = `CPF INCORRETO!`
                div_input.style.border = "1px solid rgb(167, 3, 3)"
            }
        };

        // VERIFICA O SEGUNDO DIGITO VERIFICADOR        
        function verificar_segundo_digito() {
            let resultados = [];

            for (let i = 11; i > 1; i--) {
                let digitoCpf = cpf_convertido[digitoX++];
                let resultado = digitoCpf * i;
                resultados.push(resultado);
            };

            let somar_array = resultados.reduce((valorAcumulado, valorAtual) => valorAcumulado + valorAtual, 0);
            let calculo_verificacao = (somar_array * 10) % 11;

            if (calculo_verificacao == cpf_convertido[10]) {
                div_input.style.border = "1px solid green"
                res_na_tela.style.color = "green"
                res_na_tela.innerHTML = `O CPF ${input_cpf.value} ESTÁ ATIVO`
            } else {
                res_na_tela.innerHTML = `CPF INCORRETO!`
                div_input.style.border = "1px solid rgb(167, 3, 3)"
            }
        };

    });
});

// VALIDAÇÃO DE CAMPO VAZIO
btn_input.addEventListener('click', () => {

    let inputZero = input_cpf.value
    if (inputZero == 0) {
        res_na_tela.innerHTML = `CPF INVALIDO!`
        div_input.style.border = "1px solid rgb(167, 3, 3)"
    }


})
// LIMPA AS ESTILIZAÇÕES CRIADAS PELAS VALIDAÇÕES
input_cpf.addEventListener('click', () => {

    input_cpf.value = ''
    res_na_tela.innerHTML = 'Resultado da Verificação'
    res_na_tela.style.color = 'rgb(48, 48, 48)'
    div_input.style.border = '1px solid rgb(128, 128, 128)'

});

