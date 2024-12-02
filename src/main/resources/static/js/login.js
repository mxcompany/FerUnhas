function loginUsuario() {
    const cpfOuEmail = document.getElementById('email').value;  // Campo que pode ser CPF ou Email
    const password = document.getElementById('password').value;  // Senha

    // Validação básica
    if (!cpfOuEmail || !password) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    // Criando o objeto LoginRequest com os dados do formulário
    const loginRequest = {
        cpfOuEmail: cpfOuEmail,  // Envia o CPF ou o Email
        senha: password
    };

    // Enviar os dados via Fetch API com o corpo como JSON
    fetch('/usuario/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'  // Define o tipo de conteúdo como JSON
        },
        body: JSON.stringify(loginRequest)  // Envia os dados como JSON
    })
    .then(response => response.json())  // Agora esperamos um JSON na resposta
    .then(data => {
        if (data.success) {
            // Armazena os dados no localStorage
            localStorage.setItem('user', JSON.stringify(data));  // Salva todo o objeto retornado
            alert(data.message);  // Exibe a mensagem do servidor
            window.location.href = '/index.html';  // Redireciona para o dashboard ou outra página
        } else {
            alert(data.message || "Erro ao fazer login.");
        }
    })
    .catch(error => {
        console.error("Erro ao realizar login:", error);
        alert("Ocorreu um erro. Tente novamente mais tarde.");
    });
}
