// Função para alternar a visibilidade da seção de editar telefone
function toggleEditarTelefone() {
    const editarTelefoneSection = document.getElementById('editar-telefone');
    const editarEnderecoSection = document.getElementById('editar-endereco');
    const cancelarHorarioSection = document.getElementById('editar-horarios');

    // Se a seção de telefone estiver oculta, abre ela e garante que as outras seções estejam ocultas
    if (editarTelefoneSection.style.display === 'none' || editarTelefoneSection.style.display === '') {
        editarTelefoneSection.style.display = 'block';
        editarEnderecoSection.style.display = 'none'; // Esconde a seção de endereço
        cancelarHorarioSection.style.display = 'none'; // Esconde a seção de cancelar horário
    } else {
        editarTelefoneSection.style.display = 'none'; // Esconde a seção de telefone
    }
}

// Função para alternar a visibilidade da seção de editar endereço
function toggleEditarEndereco() {
    const editarEnderecoSection = document.getElementById('editar-endereco');
    const editarTelefoneSection = document.getElementById('editar-telefone');
    const cancelarHorarioSection = document.getElementById('editar-horarios');

    // Se a seção de endereço estiver oculta, abre ela e garante que as outras seções estejam ocultas
    if (editarEnderecoSection.style.display === 'none' || editarEnderecoSection.style.display === '') {
        editarEnderecoSection.style.display = 'block';
        editarTelefoneSection.style.display = 'none'; // Esconde a seção de telefone
        cancelarHorarioSection.style.display = 'none'; // Esconde a seção de cancelar horário
    } else {
        editarEnderecoSection.style.display = 'none'; // Esconde a seção de endereço
    }
}

// Função para alternar a visibilidade da seção de cancelar horário
function toggleCancelarHorario() {
    const cancelarHorarioSection = document.getElementById('editar-horarios');
    const editarTelefoneSection = document.getElementById('editar-telefone');
    const editarEnderecoSection = document.getElementById('editar-endereco');

    // Se a seção de cancelar horário estiver oculta, abre ela e garante que as outras seções estejam ocultas
    if (cancelarHorarioSection.style.display === 'none' || cancelarHorarioSection.style.display === '') {
        cancelarHorarioSection.style.display = 'block';
        editarTelefoneSection.style.display = 'none'; // Esconde a seção de telefone
        editarEnderecoSection.style.display = 'none'; // Esconde a seção de endereço
    } else {
        cancelarHorarioSection.style.display = 'none'; // Esconde a seção de cancelar horário
    }
}

// Função para atualizar o select com os horários do usuário
function atualizarSelectRemoverHorario() {
    const select = document.getElementById('remover-horario');
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    // Faz a requisição GET para obter os agendamentos do usuário
    fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const agendamentos = data || []; // Pega os agendamentos da resposta

            select.innerHTML = '<option value="">Selecione um horário para remover</option>'; // Limpa as opções anteriores

            // Adiciona as opções no select
            agendamentos.forEach(agendamento => {
                const option = document.createElement('option');
                const dataHorario = `${agendamento.agenda.data} ${agendamento.agenda.horario}`; // Combina a data e o horário
                option.value = agendamento.id_agendamento;  // Usa o ID do agendamento como valor
                option.textContent = dataHorario;  // Exibe a data e horário
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os agendamentos:', error);
        });
}

// Chama a função para atualizar o select de horários
atualizarSelectRemoverHorario();

// REMOVER HORÁRIO
async function deletarHorario() {
    const select = document.getElementById('remover-horario').value.trim();

    if (!select) {
        alert("Selecione um horário para remover!");
        return;
    }

    // Faz a requisição DELETE para remover o agendamento
    fetch(`http://localhost:8080/agendamento/${select}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Horário removido com sucesso!');
                atualizarSelectRemoverHorario(); // Atualiza o select após a remoção
                carregarPerfil();
            } else {
                alert('Erro ao remover o horário. Verifique se o horário existe.');
                console.error('Erro na resposta:', response);
            }
        })
        .catch(error => {
            console.error('Erro ao tentar remover o horário:', error);
        });
}


//REMOVER TELEFONE
async function deletarTelefone(){
    const select = document.getElementById('remover-telefone').value.trim();

    if(!select){
        alert("Selecione um telefone para remover!");
        return;
    }

    // Faz a requisição DELETE para remover o telefone
    fetch(`http://localhost:8080/telefone/${select}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Telefone removido com sucesso!');
                atualizarSelectRemoverTelefone(); // Atualiza o select após a remoção
                atualizarTelefonesPerfil();
            } else {
                alert('Erro ao remover o telefone. Verifique se o telefone existe.');
                console.error('Erro na resposta:', response);
            }
        })
        .catch(error => {
            console.error('Erro ao tentar remover o telefone:', error);
        });
}

// ATUALIZAR HORÁRIOS DEPOIS DE REMOVER
function atualizarHorariosPerfil() {
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;
    const horariosLista = document.getElementById('horarios-lista');
    const horarioNaoCadastrado = document.getElementById('horario-nao-cadastrado');

    // Faz a requisição GET para obter os horários do usuário
    fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const agendamentos = data || []; // Pega os agendamentos da resposta

            // Limpa a lista de horários anterior
            horariosLista.innerHTML = '';

            // Verifica se há agendamentos (horários)
            if (agendamentos.length > 0) {
                if (horarioNaoCadastrado) horarioNaoCadastrado.style.display = 'none';  // Esconde mensagem de "não cadastrado"
                agendamentos.forEach(agendamento => {
                    const li = document.createElement('li');
                    li.textContent = `Data: ${agendamento.agenda.data}, Horário: ${agendamento.agenda.horario} - Serviço: ${agendamento.id_servico.tipo}`;
                    horariosLista.appendChild(li);
                });
            } else {
                // Se não houver agendamentos, exibe a mensagem "horário não cadastrado"
                if (horarioNaoCadastrado) horarioNaoCadastrado.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar os horários:', error);
        });
}


//ATUALIZAR TELEFONE DEPOIS DE REMOVER
function atualizarTelefonesPerfil() {
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;
    const telefonesLista = document.getElementById('telefones-lista');
    const telefoneNaoCadastrado = document.getElementById('telefone-nao-cadastrado');

    // Faz a requisição GET para obter os telefones do usuário
    fetch(`http://localhost:8080/telefone/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const telefones = data || []; // Pega os telefones da resposta

            // Limpa a lista de telefones anterior
            telefonesLista.innerHTML = '';

            // Verifica se há telefones
            if (telefones.length > 0) {
                if (telefoneNaoCadastrado) telefoneNaoCadastrado.style.display = 'none';  // Esconde mensagem de "não cadastrado"
                telefones.forEach(telefone => {
                    const li = document.createElement('li');
                    li.textContent = telefone.numero; // Exibe o número do telefone
                    telefonesLista.appendChild(li);
                });
            } else {
                // Se não houver telefones, exibe a mensagem "telefone não cadastrado"
                if (telefoneNaoCadastrado) telefoneNaoCadastrado.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar os telefones:', error);
        });
}


//REMOVER ENDERECO
async function deletarEndereco(){
    const select = document.getElementById('remover-endereco').value.trim();

    if(!select){
        alert("Selecione um endereco para remover!");
        return;
    }

    // Faz a requisição DELETE para remover o telefone
    fetch(`http://localhost:8080/endereco/${select}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                alert('Endereco removido com sucesso!');
                atualizarSelectRemoverEndereco(); // Atualiza o select após a remoção
                atualizarEnderecosPerfil();
            } else {
                alert('Erro ao remover o endereço. Verifique se o endereço existe.');
                console.error('Erro na resposta:', response);
            }
        })
        .catch(error => {
            console.error('Erro ao tentar remover o endereço:', error);
        });
}

//ATUALIZAR ENDERECO DEPOIS DE REMOVER
function atualizarEnderecosPerfil() {
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;
    const enderecosLista = document.getElementById('enderecos-lista');
    const enderecoNaoCadastrado = document.getElementById('endereco-nao-cadastrado');

    // Faz a requisição GET para obter os endereços do usuário
    fetch(`http://localhost:8080/endereco/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const enderecos = data || []; // Pega os endereços da resposta

            // Limpa a lista de enderecos anterior
            enderecosLista.innerHTML = '';

            // Verifica se há endereços
            if (enderecos.length > 0) {
                if (enderecoNaoCadastrado) enderecoNaoCadastrado.style.display = 'none';  // Esconde mensagem de "não cadastrado"
                enderecos.forEach(endereco => {
                    const li = document.createElement('li');
                    li.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;
                    enderecosLista.appendChild(li);
                });
            } else {
                // Se não houver endereços, exibe a mensagem "endereço não cadastrado"
                if (enderecoNaoCadastrado) enderecoNaoCadastrado.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao atualizar os endereços:', error);
        });
}

async function adicionarTelefone() {

    const numeroTelefone = document.getElementById('novo-telefone').value.trim();
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    if (!numeroTelefone) {
        alert("O campo telefone é obrigatório!");
        return;
    }

    // Prepara os dados para enviar
    const telefoneData = {
        numero: numeroTelefone,
        usuario: { id_usuario: usuarioId } // Envia o usuario como objeto com id_usuario
    };

    try {
        // Envia os dados para o backend via POST
        const response = await fetch("http://localhost:8080/telefone", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(telefoneData) // Converte os dados para JSON
        });

        if (!response.ok) {
            throw new Error("Erro ao adicionar o telefone.");
        }

        // Caso o POST seja bem-sucedido, exibe a mensagem de sucesso
        const telefone = await response.json();
        console.log("Telefone cadastrado com sucesso:", telefone);
        atualizarSelectRemoverTelefone();

        // Atualiza a lista de telefones no localStorage
        let telefonesNoLocalStorage = JSON.parse(localStorage.getItem('telefones')) || [];
        telefonesNoLocalStorage.push(telefone); // Adiciona o novo telefone à lista
        localStorage.setItem('telefones', JSON.stringify(telefonesNoLocalStorage));

        // Atualize a lista de telefones no frontend
        const telefonesLista = document.getElementById('telefones-lista');
        const telefoneItem = document.createElement('li');
        telefoneItem.textContent = numeroTelefone;
        telefonesLista.appendChild(telefoneItem);

        // Limpa o campo após o envio
        document.getElementById('novo-telefone').value = '';

    } catch (error) {
        console.error("Erro:", error.message);
        alert("Ocorreu um erro ao cadastrar o telefone.");
    }
}

async function adicionarEndereco() {
    const cep = document.getElementById('cep').value.trim();
    const rua = document.getElementById('rua').value.trim();
    const bairro = document.getElementById('bairro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const numero = document.getElementById('novo-numero').value.trim();
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    if (!cep || !rua || !bairro || !cidade || !numero) {
        alert("Todos os campos são obrigatórios!");
        return;
    }

    // Prepara os dados para enviar
    const dadosEndereco = {
        rua: rua,
        numero: numero,
        bairro: bairro,
        cep: cep,
        cidade: cidade,
        id_usuario: usuarioId
    };

    try {
        const response = await fetch("http://localhost:8080/endereco", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(dadosEndereco)
        });

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ao adicionar o endereço: ${errorMessage}`);
        }

        // Caso o POST seja bem-sucedido, exibe a mensagem de sucesso
        const endereco = await response.json();
        console.log("Endereço cadastrado com sucesso:", endereco);
        atualizarSelectRemoverEndereco();

        // Atualiza a lista de endereços no localStorage
        let enderecosNoLocalStorage = JSON.parse(localStorage.getItem('enderecos')) || [];
        enderecosNoLocalStorage.push(endereco); // Adiciona o novo endereço à lista
        localStorage.setItem('enderecos', JSON.stringify(enderecosNoLocalStorage));

        // Atualize a lista de endereços no frontend
        const enderecosLista = document.getElementById('enderecos-lista');
        const enderecoItem = document.createElement('li');
        enderecoItem.textContent = `${rua}, ${numero} - ${bairro}, ${cidade}`;
        enderecosLista.appendChild(enderecoItem);

        // Limpa os campos após o envio
        document.getElementById('cep').value = '';
        document.getElementById('novo-numero').value = '';
        document.getElementById('rua').value = '';
        document.getElementById('bairro').value = '';
        document.getElementById('cidade').value = '';

    } catch (error) {
        console.error("Erro:", error.message);
        alert("Ocorreu um erro ao cadastrar o endereço.");
    }
}

// Função para carregar os dados do localStorage
function carregarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    if (!usuario || !usuario.success) {
        alert("Usuário não autenticado. Redirecionando para o login.");
        window.location.href = "login.html";
        return;
    }

    // Preenche os campos com os dados do usuário
    document.getElementById('nome-usuario').innerText = usuario.fname + ' ' + usuario.lname || "Não informado";
    document.getElementById('email-usuario').innerText = usuario.email || "Não informado";
    document.getElementById('cpf-usuario').innerText = usuario.cpf || "Não informado";
    document.getElementById('tipo-usuario').innerText = usuario.tipos ? usuario.tipos.nome : "Não informado";

    // Carrega os telefones
    const telefonesLista = document.getElementById('telefones-lista');
    const telefoneNaoCadastrado = document.getElementById('telefone-nao-cadastrado');

    // Faz a requisição GET para obter os telefones do usuário
    fetch(`http://localhost:8080/telefone/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Verifique os dados aqui

            const telefones = data || []; // Pega os telefones da resposta

            // Limpa a lista de telefones anterior
            telefonesLista.innerHTML = '';

            // Verifica se há telefones
            if (telefones.length > 0) {
                if (telefoneNaoCadastrado) telefoneNaoCadastrado.style.display = 'none';  // Esconde mensagem de "não cadastrado"
                telefones.forEach(telefone => {
                    // Aqui assumimos que cada telefone tem a propriedade 'numero'
                    const li = document.createElement('li');
                    li.textContent = telefone.numero;  // Use a propriedade 'numero' para mostrar o telefone
                    telefonesLista.appendChild(li);
                });
            } else {
                // Se não houver telefones, exibe a mensagem "telefone não cadastrado"
                if (telefoneNaoCadastrado) telefoneNaoCadastrado.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os telefones:', error);
        });

    // Carrega os enderecos
    const enderecosLista = document.getElementById('enderecos-lista');
    const enderecoNaoCadastrado = document.getElementById('endereco-nao-cadastrado');

    // Faz a requisição GET para obter os endereços do usuário
    fetch(`http://localhost:8080/endereco/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Verifique os dados aqui

            const enderecos = data || []; // Pega os endereços da resposta

            // Limpa a lista de endereços anterior
            enderecosLista.innerHTML = '';

            // Verifica se há endereços
            if (enderecos.length > 0) {
                if (enderecoNaoCadastrado) enderecoNaoCadastrado.style.display = 'none'; // Esconde mensagem de "não cadastrado"
                enderecos.forEach(endereco => {
                    // Aqui, assumimos que cada objeto de endereço tem as propriedades 'logradouro', 'bairro', 'cidade'
                    const li = document.createElement('li');
                    li.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;
                    enderecosLista.appendChild(li);
                });
            } else {
                // Se não houver endereços, exibe a mensagem "endereço não cadastrado"
                if (enderecoNaoCadastrado) enderecoNaoCadastrado.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os endereços:', error);
        });

        //carregar os horarios
        const horariosLista = document.getElementById('horarios-lista');
        const horarioVazio = document.getElementById('horario-vazio');

        fetch(`http://localhost:8080/agendamento/usuario/${usuarioId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados recebidos:', data); // Verifique os dados aqui

            const horarios = data || []; // Pega os endereços da resposta

            // Limpa a lista de endereços anterior
            horariosLista.innerHTML = '';

            // Verifica se há endereços
            if (horarios.length > 0) {
                if (horarioVazio) horarioVazio.style.display = 'none'; // Esconde mensagem de "não cadastrado"
                horarios.forEach(horarios => {
                    // Aqui, assumimos que cada objeto de endereço tem as propriedades 'logradouro', 'bairro', 'cidade'
                    const li = document.createElement('li');
                    li.textContent = `Data: ${horarios.agenda.data}, Horário: ${horarios.agenda.horario} - Serviço: ${horarios.id_servico.tipo} - Endereço: ${horarios.endereco.descricao}`;
                    horariosLista.appendChild(li);
                });
            } else {
                // Se não houver endereços, exibe a mensagem "endereço não cadastrado"
                if (horarioVazio) horarioVazio.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os horários:', error);
        });
}

// Função para atualizar o select com os telefones do usuário
function atualizarSelectRemoverTelefone() {
    const select = document.getElementById('remover-telefone');
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    // Faz a requisição GET para obter os telefones do usuário
    fetch(`http://localhost:8080/telefone/usuario/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const telefones = data || []; // Pega os telefones da resposta

            select.innerHTML = '<option value="">Selecione um telefone para remover</option>'; // Limpa as opções anteriores

            // Adiciona as opções no select
            telefones.forEach(telefone => {
                const option = document.createElement('option');
                option.value = telefone.id_telefone;  // Usa o ID do telefone como valor
                option.textContent = telefone.numero;  // Exibe o número do telefone
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os telefones:', error);
        });
}

// Chama a função para atualizar o select de telefones
atualizarSelectRemoverTelefone();

// Função para atualizar o select com os enderecos do usuário
function atualizarSelectRemoverEndereco() {
    const select = document.getElementById('remover-endereco');
    const usuarioId = JSON.parse(localStorage.getItem("user")).id;

    // Faz a requisição GET para obter os telefones do usuário
    fetch(`http://localhost:8080/endereco/usuario/${usuarioId}`)
        .then(response => response.json())
        .then(data => {
            const enderecos = data || []; // Pega os telefones da resposta

            select.innerHTML = '<option value="">Selecione um telefone para remover</option>'; // Limpa as opções anteriores

            // Adiciona as opções no select
            enderecos.forEach(endereco => {
                const option = document.createElement('option');
                option.value = endereco.id_endereco;  // Usa o ID do telefone como valor
                option.textContent = `${endereco.rua}, ${endereco.numero} - ${endereco.bairro}, ${endereco.cidade}`;
                select.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar os telefones:', error);
        });
}

// Chama a função para atualizar o select de telefones
atualizarSelectRemoverEndereco();

// Função de logout
function logout() {
    localStorage.removeItem('user'); // Remove o usuário do localStorage
    alert("Logout realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para o login
}

// Carrega os dados do perfil ao carregar a página
document.addEventListener('DOMContentLoaded', carregarPerfil);

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
