

//Mudar cor do tema

const mode = document.getElementById('icon');

mode.addEventListener('click', () => {
    const form = document.body;

    if (mode.classList.contains('fa-moon')) {
        mode.classList.remove('fa-moon');
        mode.classList.add('fa-sun');

        form.classList.add('dark-mode');
        changeImage("img/logoclara.jpg");
        return;
    }

    mode.classList.add('fa-moon');
    mode.classList.remove('fa-sun');
    form.classList.remove('dark-mode');
    changeImage("img/logoescura.jpg.png");
}); 

function changeImage(newImageUrl) {
    document.getElementById("figura").src = newImageUrl;
}


    // Função para ler o CEP e preencher o endereço
        function preencherEndereco() {
            var cep = document.getElementById('cep').value;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://viacep.com.br/ws/${cep}/json/`);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    var data = JSON.parse(xhr.responseText);
                    document.getElementById('rua').value = data.logradouro;
                    document.getElementById('bairro').value = data.bairro;
                    document.getElementById('cidade').value = data.localidade;
                    
                } else {
                    MensagemErro('Erro ao obter endereço.', false);
                }
            }
            xhr.send();
        }
        document.getElementById('cep').addEventListener('blur', preencherEndereco);
        

    
    // Função para salvar um novo cadastro no localStorage
    function salvarCadastroNoLocalStorage() {
        const formData = {
        nome: document.getElementById('name').value,
        nomeMae: document.getElementById('namemother').value,
        cpf: document.getElementById('cpf').value,
        date: document.getElementById('date').value,
        cell: document.getElementById('celular').value,
        tell: document.getElementById('numberfixo').value,
        cep: document.getElementById('cep').value,
        rua: document.getElementById('rua').value,
        bairro: document.getElementById('bairro').value,
        cidade: document.getElementById('cidade').value,
        address: document.getElementById('complemento').value,
        sexo: document.getElementById('sex').value,
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        confirmPassword: document.getElementById('confirmasenha').value,
        };
    
        // Verifique se há dados anteriores no localStorage
        let cadastrosAnteriores = JSON.parse(localStorage.getItem('cadastros')) || [];
    
        // Adicione o novo cadastro ao array de cadastros
        cadastrosAnteriores.push(formData);
    
        // Converte o array de cadastros para JSON
        const cadastrosJSON = JSON.stringify(cadastrosAnteriores);
    
        // Armazena o array de cadastros no localStorage
        localStorage.setItem('cadastros', cadastrosJSON);

        MensagemSucesso('Cadastro realizado com sucesso!', true);
        setTimeout(function () {
            window.location.href = "login.html";
        }, 2000); // Redireciona após 2 segundos (novamente por capricho, opcional)
    
    }
    
    // Adicione um evento de envio ao formulário
    const form = document.getElementById('form');
    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário
    
        if (!validarSenhas()) {
            MensagemErro('Por favor, corrija os erros no formulário.', false);
        }
        else {
            salvarCadastroNoLocalStorage();
            form.reset();
            setTimeout(function () {
                window.location.href = "/login.html";
            }, 3000); // Redireciona após 2 segundos (novamente por capricho, opcional)
        
        }
    });
    





    function validarSenhas() {
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmasenha').value;
    
        if (password !== confirmPassword) {
            MensagemErro('As senhas não coincidem.', false);
            return false;
        }
    
        return true;
    }

    //Login do usuario
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginform');

    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;

        // Recupere os dados do usuário armazenados no localStorage
        const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];

        // Verifique se o usuário e a senha correspondem aos dados armazenados no localStorage
        const user = cadastros.find((user) => user.username === username && user.password === password);
        if (user) {
            MensagemSucesso('Login bem-sucedido.', true);
            // Redirecione para a página de login ou qualquer outra página desejada
            setTimeout(function () {
                window.location.href = "/Projeto Telecall Victor/home.html";
            }, 3000); // Redireciona após 2 segundos (novamente por capricho, opcional)
        
        } else {
            MensagemErro('Login ou senha inválidos. Por favor, tente novamente.', false);
        }
    })
});


function MensagemErro(mensagem) {
    var mensagemDiv = document.getElementById("toast-modal");
    mensagemDiv.innerHTML = mensagem;
    mensagemDiv.classList.add("toast-modal");
    mensagemDiv.style.display = "block";

    // Esconder o toast após alguns segundos (por exemplo, 3 segundos)
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);  // Ajuste o tempo conforme necessário
}

function MensagemSucesso(mensagem) {
    var mensagemDiv = document.getElementById("toast-sucesso");
    mensagemDiv.innerHTML = mensagem;
    mensagemDiv.classList.add("toast-sucesso");
    mensagemDiv.style.display = "block";

    // Esconder o toast após alguns segundos (por exemplo, 3 segundos)
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 3000);  // Ajuste o tempo conforme necessário
}

$(document).ready(function () {
    // Aplica máscara ao campo de CPF
    $('#cpf').inputmask('999.999.999-99');

    // Aplica máscara ao campo de telefone
    $('#numberfixo').inputmask('(99) 9999-9999');

    // Aplica máscara ao campo de celular
    $('#celular').inputmask('(99) 99999-9999');

    // Aplica máscara ao campo de CEP
    $('#cep').inputmask('99999-999');
});

    // Adiciona validação de tamanho mínimo ao campo de nome
    $('#nome').on('input', function () {
        if ($(this).val().length < 11) {
            $(this).get(0).setCustomValidity('O nome deve ter no mínimo 11 caracteres.');
        } else {
            $(this).get(0).setCustomValidity('');
        }
    });

    // Adiciona validação customizada ao campo de CPF
    $('#cpf').on('input', function () {
        var isValid = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test($(this).val());
        if (!isValid) {
            $(this).get(0).setCustomValidity('CPF inválido');
        } else {
            $(this).get(0).setCustomValidity('');
        }
    });

    // Adiciona validação customizada ao campo de telefone
    $('#numberfixo').on('input', function () {
        var isValid = /\(\d{2}\) \d{4}-\d{4}/.test($(this).val());
        if (!isValid) {
            $(this).get(0).setCustomValidity('Telefone inválido');
        } else {
            $(this).get(0).setCustomValidity('');
        }
    });

    // Adiciona validação customizada ao campo de celular
    $('#celular').on('input', function () {
        var isValid = /\(\d{2}\) \d{5}-\d{4}/.test($(this).val());
        if (!isValid) {
            $(this).get(0).setCustomValidity('Celular inválido');
        } else {
            $(this).get(0).setCustomValidity('');
        }
    });

    // Adiciona validação customizada ao campo de CEP
    $('#cep').on('input', function () {
        var isValid = /\d{5}-\d{3}/.test($(this).val());
        if (!isValid) {
            $(this).get(0).setCustomValidity('CEP inválido');
        } else {
            $(this).get(0).setCustomValidity('');
        }
    });

    // Adiciona formatação ao submeter o formulário
    $('#meuFormulario').on('submit', function () {
        formatarCampos();
    });

    // Função para formatar os campos antes de enviar o formulário
    function formatarCampos() {
        $('#cpf').val($('#cpf').inputmask('unmaskedvalue'));
        $('#numberfixo').val($('#numberfixo').inputmask('unmaskedvalue'));
        $('#celular').val($('#celular').inputmask('unmaskedvalue'));
        $('#cep').val($('#cep').inputmask('unmaskedvalue'));
    }
