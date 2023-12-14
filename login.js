const cadastros = JSON.parse(localStorage.getItem('cadastros')) || [];


  // Recuperar login e senha do localStorage
const username = localStorage.getItem('username');
const password = localStorage.getItem('password');
   // Obter dados do usuário (pode ser feito por meio de um formulário)
const login = document.getElementById('login-username').value;
const Senha = document.getElementById('login-password').value;

  // Validar login e senha
 // Verifique se o usuário e a senha correspondem aos dados armazenados no localStorage
const user = cadastros.find((user) => user.username === login && user.password === Senha);
if (user) {
      // Login válido
    MensagemSucesso('Login bem-sucedido!');
    setTimeout(function () {
        window.location.href = "/Projeto Telecall Victor/home.html";
      }, 2000); // Redireciona após 2 segundos (novamente por capricho, opcional)

} else {
      // Login inválido
    MensagemErro('Login ou senha incorretos.');
}
        
function validatePassword() {
    const passwordInput = document.getElementById('password');
    const passwordError = document.getElementById('passwordError');
    const passwordValue = passwordInput.value;

    // Expressão regular para verificar se a senha possui exatamente 8 caracteres alfabéticos
    const regex = /^[a-zA-Z]{8}$/;

    if (regex.test(passwordValue)) {
        passwordError.textContent = ''; // Limpa a mensagem de erro se a senha for válida
    } else {
        passwordError.textContent = 'A senha deve ter exatamente 8 caracteres alfabéticos.';
    }
}

function validateUsername() {
    const passwordInput = document.getElementById('username');
    const passwordError = document.getElementById('usernameError');
    const passwordValue = passwordInput.value;

    // Expressão regular para verificar se a senha possui exatamente 8 caracteres alfabéticos
    const regex = /^[a-zA-Z]{6}$/;

    if (regex.test(passwordValue)) {
        passwordError.textContent = ''; // Limpa a mensagem de erro se a senha for válida
    } else {
        passwordError.textContent = 'A senha deve ter exatamente 8 caracteres alfabéticos.';
    }
}