document.querySelector('.toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('senha');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    
    // Troca o ícone
    this.innerHTML = type === 'password'
        ? `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
        </svg>`
        : `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829"/>
            <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z"/>
        </svg>`;
});

const cep = document.getElementById('cep');
const rua = document.getElementById('rua');
const bairro = document.getElementById('bairro');
const cidade = document.getElementById('cidade');
const message = document.getElementById('message');

// Evento de input para capturar a mudança no campo CEP
cep.addEventListener('input', async () => {
    if (cep.value === '') {
        // Limpa os campos de endereço e restaura os placeholders
        rua.value = '';
        bairro.value = '';
        cidade.value = '';
        
        rua.setAttribute('placeholder', 'Rua');
        bairro.setAttribute('placeholder', 'Bairro');
        cidade.setAttribute('placeholder', 'Cidade');
        message.textContent = ''; // Limpa a mensagem de erro, se houver
        return;
    }

    try {
        const onlyNumber = /^[0-9]+$/; // Verifica se o CEP contém apenas números
        const cepValid = /^[0-9]{8}$/; // Verifica se o CEP tem exatamente 8 dígitos

        // Se o CEP for inválido
        if (!onlyNumber.test(cep.value) || !cepValid.test(cep.value)) {
            // Limpa os campos de endereço e coloca placeholders novamente
            rua.value = '';
            bairro.value = '';
            cidade.value = '';

            rua.setAttribute('placeholder', 'Rua');
            bairro.setAttribute('placeholder', 'Bairro');
            cidade.setAttribute('placeholder', 'Cidade');
            message.textContent = 'CEP Inválido';
            setTimeout(() => {
                message.textContent = ''; // Limpa a mensagem de erro após 3 segundos
            }, 3000);
            return;
        }

        // Consulta à API ViaCEP
        const response = await fetch(`https://viacep.com.br/ws/${cep.value}/json/`);

        if (!response.ok) {
            throw await response.json();
        }

        const responseCep = await response.json();

        // Preencher os campos de endereço com as informações da API
        rua.value = responseCep.logradouro || '';
        bairro.value = responseCep.bairro || '';
        cidade.value = responseCep.localidade || '';

        // Caso os campos de rua, bairro e cidade estejam vazios, coloca os placeholders
        if (!rua.value) rua.setAttribute('placeholder', 'Rua');
        if (!bairro.value) bairro.setAttribute('placeholder', 'Bairro');
        if (!cidade.value) cidade.setAttribute('placeholder', 'Cidade');

    } catch (error) {
        if (error?.cep_error) {
            message.textContent = error.cep_error;
            setTimeout(() => {
                message.textContent = "";
            }, 3000);
        }
        console.log(error);
    }
});

async function cadastrarUsuario() {
    const fname = document.getElementById('firstname').value.trim();
    const lname = document.getElementById('lastname').value.trim();
    const email = document.getElementById('email').value.trim();
    const senha = document.getElementById('senha').value.trim();
    const cpf = document.getElementById('cpf').value.trim();
    const number = document.getElementById('number').value.trim();
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const num = document.getElementById('num').value.trim();
    const cidade = document.getElementById('cidade').value.trim();

    const messageElement = document.getElementById('message');

    // Validação básica dos campos
    if (!fname || !lname || !email || !senha || !cpf || !number || !cep || !rua || !bairro || !num || !cidade) {
        messageElement.textContent = "Todos os campos são obrigatórios!";
        messageElement.style.color = "red";
        return;
    }

    try {
        // Envia os dados do usuário
        const usuarioResponse = await fetch("http://localhost:8080/usuario", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fname,
                lname,
                email,
                senha,
                cpf,
                number,
                tipos: {
                    id_tipos: 1
                }
            })
        });

        if (!usuarioResponse.ok) {
            throw new Error("Erro ao cadastrar usuário.");
        }

        // Busca o usuário pelo CPF para obter o ID
        const buscaResponse = await fetch(`http://localhost:8080/usuario/cpf/${cpf}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!buscaResponse.ok) {
            throw new Error("Erro ao buscar usuário pelo CPF.");
        }

        const usuarioData = await buscaResponse.json();
        const usuarioId = usuarioData.id_usuario;

        // Envia os dados do endereço com o ID do usuário
        const enderecoResponse = await fetch("http://localhost:8080/endereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rua,
                numero: num,  // num representa o valor de número de rua no formulário
                bairro,
                cep,
                cidade,
                id_usuario: usuarioId  // Certifique-se de que usuarioId é um número
            })
        });

        if (!enderecoResponse.ok) {
            throw new Error("Erro ao cadastrar endereço.");
        }

        // Envia os dados do telefone com o ID do usuário
        const telefoneResponse = await fetch("http://localhost:8080/telefone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                numero: number,
                id_usuario: usuarioId
            })            
        });

        if (!telefoneResponse.ok) {
            throw new Error("Erro ao cadastrar telefone.");
        }

        messageElement.textContent = "Usuário, endereço e telefone cadastrados com sucesso!";
        messageElement.style.color = "green";

        // Limpa os campos do formulário
        document.querySelectorAll('input').forEach(input => input.value = '');
    } catch (error) {
        messageElement.textContent = `Erro: ${error.message}`;
        messageElement.style.color = "red";
    }
}