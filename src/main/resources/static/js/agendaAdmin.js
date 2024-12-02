document.addEventListener("DOMContentLoaded", () => {
    // Inicializa o calendário no modo inline
    flatpickr("#inline-calendar", {
        inline: true,
        dateFormat: "Y-m-d", // Formato da data para envio ao backend
        minDate: "today", // Datas a partir de hoje
        maxDate: new Date().fp_incr(3000), // Máximo de 3000 dias no futuro
        locale: "pt", // Define o idioma para português
        disableMobile: true, // Garante que o Flatpickr não use seletores nativos no mobile
        monthSelectorType: "static", // Remove o dropdown, mas permite edição manual
        daySelectorType: "static",
        onChange: function (selectedDates, dateStr, instance) {
            // Atualiza o campo de data com o valor selecionado
            document.getElementById("date").value = dateStr;
        },
    });

    function carregarInformacoes() {
        const usuario = JSON.parse(localStorage.getItem('user'));
        const tipoUser = usuario?.tipos?.nome;
    
        if (!usuario || !usuario.success) {
            alert("Usuário não autenticado. Redirecionando para o login.");
            window.location.href = "login.html";
            return;
        }
    
        const servicosLista = document.getElementById('servicos-lista');
        const servicoNaoCadastrado = document.getElementById('servico-nao-cadastrado');
    
        // Fazendo a requisição para a API
        fetch(`http://localhost:8080/servico`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.statusText);
                }
                return response.json();  // Aqui convertemos para JSON
            })
            .then(data => {
                console.log(data); // Verificando a resposta para garantir que seja uma array
    
                // Verificando se os dados são uma array
                const servicos = data || [];
    
                servicosLista.innerHTML = '';
    
                if (servicos.length > 0) {
                    if (servicoNaoCadastrado) servicoNaoCadastrado.style.display = 'none';
                    // Exibindo os serviços na página
                    servicos.forEach(servico => {
                        console.log(servico); // Verifique o conteúdo de cada 'servico'
    
                        // Acessando 'tipo' e 'valor' do objeto de serviço
                        const li = document.createElement('li');
                        li.textContent = `${servico.tipo}, R$${servico.valor}`;
                        servicosLista.appendChild(li);
                    });
                } else {
                    if (servicoNaoCadastrado) servicoNaoCadastrado.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Erro ao buscar os serviços:', error);
            });
    }
    

    // Função para enviar o agendamento via POST
    async function postAgenda(event) {
        // Previne o comportamento padrão do formulário (não enviar o formulário)
        event.preventDefault();

        // Captura os dados do formulário
        const horario = document.getElementById("time").value;
        const date = document.getElementById("date").value;

        // Verifique se o horário e a data foram preenchidos
        if (!horario || !date) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        // Crie o objeto que será enviado no corpo da requisição
        const agendaData = {
            horario: horario,
            data: date,
            disponivel: true
        };

        // Envia a requisição POST usando fetch
        try {
            const response = await fetch('http://localhost:8080/agenda', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(agendaData),
            });

            // Verifica se a requisição foi bem-sucedida
            if (response.ok) {
                const result = await response.json();
                console.log(result); // Exibe no console (ou faça algo com os dados retornados)
                alert("Horário disponibilzado com sucesso!");
                // Redirecionar ou limpar o formulário, se necessário
                document.getElementById("bookingForm").reset();
            } else {
                // Se a resposta for um erro, exibe mensagem
                const error = await response.json();
                alert(`Erro ao agendar: ${error.message}`);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert("Ocorreu um erro. Tente novamente.");
        }
    }

    // Associa a função `postAgenda` ao evento `submit` do formulário
    document.getElementById("bookingForm").addEventListener("submit", postAgenda);

    // Carrega informações e valida o usuário
    carregarInformacoes();
});

// Função para alternar a visibilidade da seção de editar serviços
function toggleEditarServico() {
    const editarServicoSection = document.getElementById('editar-servico');

    // Se a seção de serviço estiver oculta, exibe ela e oculta as outras
    if (editarServicoSection.style.display === 'none' || editarServicoSection.style.display === '') {
        editarServicoSection.style.display = 'block';
    } else {
        editarServicoSection.style.display = 'none'; // Esconde a seção de serviço
    }
}
// Remover Serviço
async function deletarServico() {
    const select = document.getElementById('remover-servico').value.trim();

    if (!select) {
        alert("Selecione um serviço para remover!");
        return;
    }

    try {
        const response = await fetch(`http://localhost:8080/servico/${select}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            alert('Serviço removido com sucesso!');
            atualizarListaServicos(); // Atualiza a lista após remoção
        } else {
            alert('Erro ao remover o serviço. Verifique se o serviço existe.');
        }
    } catch (error) {
        console.error('Erro ao tentar remover o serviço:', error);
    }
}

// Adicionar Serviço
async function adicionarServico() {
    const nomeServico = document.getElementById('novo-servico').value.trim();
    const precoServico = document.getElementById('preco-servico').value.trim();

    if (!nomeServico || !precoServico) {
        alert("Os campos de nome e preço são obrigatórios!");
        return;
    }

    const servicoData = {
        tipo: nomeServico,
        valor: parseFloat(precoServico), // Converte o preço para número
    };

    try {
        const response = await fetch("http://localhost:8080/servico", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(servicoData),
        });

        if (response.ok) {
            alert("Serviço adicionado com sucesso!");
            atualizarListaServicos(); // Atualiza a lista após adição
            document.getElementById('novo-servico').value = '';
            document.getElementById('preco-servico').value = '';
        } else {
            alert("Erro ao adicionar o serviço.");
        }
    } catch (error) {
        console.error("Erro:", error.message);
    }
}

// Editar Serviço
async function editarServico() {
    const idServico = document.getElementById('editar-servico-selecionado').value;
    const novoNome = document.getElementById('novo-nome-servico').value;
    const novoPreco = document.getElementById('novo-preco-servico').value;

    if (!idServico || !novoNome || !novoPreco) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const servicoAtualizado = {
        tipo: novoNome,
        valor: novoPreco
    };

    try {
        const response = await fetch(`http://localhost:8080/servico/${idServico}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(servicoAtualizado)
        });

        if (response.ok) {
            const servico = await response.json();
            alert("Serviço atualizado com sucesso!");
            
            // Atualiza a lista de serviços após a edição
            atualizarListaServicos();

            // Limpa os campos de edição
            document.getElementById('novo-nome-servico').value = '';
            document.getElementById('novo-preco-servico').value = '';
        } else {
            alert("Erro ao atualizar o serviço.");
        }
    } catch (error) {
        console.error("Erro ao tentar editar o serviço:", error);
    }
}

// Atualizar Lista de Serviços
async function atualizarListaServicos() {
    try {
        const response = await fetch("http://localhost:8080/servico");
        if (!response.ok) {
            throw new Error("Erro ao buscar os serviços.");
        }

        const servicos = await response.json();
        console.log("Serviços retornados:", servicos); // Verifica a resposta

        // Atualiza as listas no HTML
        const listaServicos = document.getElementById('servicos-lista');
        const selectRemover = document.getElementById('remover-servico');
        const selectEditar = document.getElementById('editar-servico-selecionado');

        listaServicos.innerHTML = '';
        selectRemover.innerHTML = '<option value="">Selecione um serviço para remover</option>';
        selectEditar.innerHTML = '<option value="">Selecione um serviço para editar</option>';

        servicos.forEach(servico => {
            console.log("Processando serviço:", servico); // Log do serviço processado

            // Atualiza a lista de exibição
            const li = document.createElement('li');
            li.textContent = `${servico.tipo} - R$${parseFloat(servico.valor).toFixed(2)}`;
            listaServicos.appendChild(li);

            // Atualiza os selects
            const optionRemover = document.createElement('option');
            optionRemover.value = servico.id_servico;
            optionRemover.textContent = servico.tipo; // Agora usa 'tipo'
            selectRemover.appendChild(optionRemover);

            const optionEditar = document.createElement('option');
            optionEditar.value = servico.id_servico;
            optionEditar.textContent = servico.tipo; // Agora usa 'tipo'
            selectEditar.appendChild(optionEditar);
        });
    } catch (error) {
        console.error("Erro ao atualizar a lista de serviços:", error);
    }
}

// Chamar a função ao carregar a página
atualizarListaServicos();
