document.addEventListener("DOMContentLoaded", () => {
    flatpickr("#inline-calendar", {
        inline: true,
        dateFormat: "Y-m-d",
        minDate: "today",
        maxDate: new Date().fp_incr(3000),
        locale: "pt", // Usando a localidade pt
        disableMobile: true,
        monthSelectorType: "static",
        daySelectorType: "static",
        onChange: function (selectedDates, dateStr, instance) {
            document.getElementById("date").value = dateStr;
            console.log("Data selecionada:", dateStr);
            atualizarHorarios(dateStr);
        },
    });
});


    // Função para buscar os endereços
    async function fetchEnderecos() {
        const usuarioId = JSON.parse(localStorage.getItem("user")).id;
        try {
            const response = await fetch(`http://localhost:8080/endereco/usuario/${usuarioId}`);
            const enderecos = await response.json();

            const selectEndereco = document.getElementById("endereco");

            // Limpa o select antes de adicionar as opções
            selectEndereco.innerHTML = '<option value="">Selecione um endereço</option>';

            // Preenche o select com os endereços
            enderecos.forEach((endereco) => {
                const option = document.createElement("option");
                option.value = endereco.id_endereco;
                option.textContent = endereco.descricao;
                selectEndereco.appendChild(option);
            });
        } catch (error) {
            console.error("Erro ao carregar os endereços:", error);
        }
    }

    // Carrega os endereços ao carregar a página
    fetchEnderecos();

    // Captura o envio do formulário
    bookingForm.addEventListener("submit", async (event) => {
        event.preventDefault();
    
        const formData = new FormData(bookingForm);
        const date = formData.get("date");
        const time = formData.get("time");
        const servico = formData.get("servico");
        const endereco = formData.get("endereco");

    
        // Validação do usuário no localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.id) {
            alert("Usuário não autenticado. Faça login novamente.");
            return;
        }
        const usuarioId = user.id;
    
        try {
            const idAgenda = await fetchAgendaId(date, time);
            if (!idAgenda) {
                alert("Erro ao buscar o ID da agenda. Verifique os dados e tente novamente.");
                return;
            }
    
            const data = {
                agenda: {
                    id_agenda: idAgenda // ID da agenda (horário disponível)
                },
                usuario: {
                    id_usuario: usuarioId // ID do usuário logado
                },
                id_servico: {
                    id_servico: servico // ID de um serviço existente
                },
                endereco: {
                    id_endereco: endereco // ID de um endereço válido
                }
            };
            
    
            const isAvailable = await checkDisponibilidade(date, time);
            if (isAvailable) {
                await submitAgendamento(data);
            } else {
                alert("O horário selecionado já está ocupado. Tente outro horário.");
            }
        } catch (error) {
            console.error("Erro durante o processamento:", error);
            alert("Ocorreu um erro. Por favor, tente novamente.");
        }
    });

// Função para buscar o ID da agenda
async function fetchAgendaId(date, time) {
    try {
        const response = await fetch(
            `http://localhost:8080/agenda/disponibilidade?id_data=${date}&horario=${time}`
        );

        if (!response.ok) {
            console.error("Erro ao buscar ID da agenda:", response.statusText);
            return null;
        }

        const agenda = await response.json();
        return agenda.id_agenda; // Supondo que a resposta contenha um campo `id_agenda`
    } catch (error) {
        console.error("Erro ao buscar ID da agenda:", error);
        return null;
    }
}

// Função para verificar a disponibilidade
async function checkDisponibilidade(date, time) {
    const response = await fetch(`/agenda/disponibilidade?id_data=${date}&horario=${time}`);
    const isAvailable = await response.json();
    return isAvailable; // Retorna o valor booleano de disponibilidade
}

// Função para enviar o agendamento
async function submitAgendamento(data) {
    const response = await fetch("/agendamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.ok) {
        alert("Agendamento realizado com sucesso!");
        bookingForm.reset(); // Limpa o formulário após o agendamento
    } else {
        alert("Erro ao realizar o agendamento.");
    }
}


// Função para buscar os servicos
async function fetchServicos() {
    try {
        const response = await fetch(`http://localhost:8080/servico`);
        const servicos = await response.json();

        const selectServico = document.getElementById("servico");

        // Limpa o select antes de adicionar as opções
        selectServico.innerHTML = '<option value="">Selecione um serviço</option>';

        // Preenche o select com os endereços
        servicos.forEach((servico) => {
            const option = document.createElement("option");
            option.value = servico.id_servico;
            option.textContent = `${servico.tipo}, R$${servico.valor}`;
            selectServico.appendChild(option);
        });
    } catch (error) {
        console.error("Erro ao carregar os serviços:", error);
    }
}

// Carrega os endereços ao carregar a página
fetchServicos();

// Função para atualizar o select de horários com base na data selecionada
function atualizarHorarios(dataSelecionada) {
    const selectHorario = document.getElementById("time");
    // Limpa o select atual
    selectHorario.innerHTML = "<option value=''>Selecione um horário</option>";

    // Faz a requisição GET para o backend
    fetch('http://localhost:8080/agenda')
        .then(response => response.json())
        .then(data => {
            // Filtra os horários disponíveis para a data selecionada
            const horariosDisponiveisNaData = data.filter(item => item.data === dataSelecionada && item.disponivel);

            // Adiciona as opções de horários no select
            horariosDisponiveisNaData.forEach(item => {
                const option = document.createElement("option");
                option.value = item.horario;
                option.textContent = item.horario;
                selectHorario.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Erro ao buscar horários:', error);
            alert('Erro ao buscar horários disponíveis');
        });
}

flatpickr("#inline-calendar", {
    dateFormat: "Y-m-d", // Formato da data (ano-mês-dia)
    onChange: function (selectedDates, dateStr, instance) {
        console.log('Data selecionada:', dateStr);  // Verifica se a data é passada corretamente
        atualizarHorarios(date);  // Atualiza os horários para a data selecionadac
    }
});