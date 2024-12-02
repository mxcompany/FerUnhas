async function carregarInformacoes() {
    const usuario = JSON.parse(localStorage.getItem('user'));
    const tipoUser = usuario?.tipos?.nome;

    const horariosLista = document.getElementById('horarios-lista');
    const horarioVazio = document.getElementById('horario-vazio');

    // Fazendo a requisição para a API
    fetch(`http://localhost:8080/agendamento`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();  // Aqui convertemos para JSON
        })
        .then(data => {
            console.log(data); // Verificando a resposta para garantir que seja um array

            // Verificando se os dados são um array
            const horarios = data || [];

            horariosLista.innerHTML = '';

            if (horarios.length > 0) {
                if (horarioVazio) horarioVazio.style.display = 'none';
                // Exibindo os horários na página
                horarios.forEach(horario => {
                    console.log(horario); // Verifique o conteúdo de cada 'horario'

                    // Acessando as propriedades corretamente
                    const li = document.createElement('li');
                    li.textContent = `Data: ${horario.agenda.data}, Horário: ${horario.agenda.horario} - Serviço: ${horario.id_servico.tipo} - Endereço: ${horario.endereco.descricao}`;
                    horariosLista.appendChild(li);
                });
            } else {
                if (horarioVazio) horarioVazio.style.display = 'block';
            }
        })
        .catch(error => {
            console.error('Erro ao buscar os serviços:', error);
        });
}

carregarInformacoes();


