function menuOnClick() {
  document.getElementById("menu-bar").classList.toggle("change");
  document.getElementById("nav").classList.toggle("change");
  document.getElementById("menu-bg").classList.toggle("change-bg");
}

const slider = document.querySelectorAll('.slider');
const btnPrev = document.getElementById('prev-button');
const btnNext = document.getElementById('next-button');

let lastScrollTop = 0; // Guarda a posição de rolagem anterior
const menuNav = document.getElementById('menu-nav'); // Referência ao menu de navegação
const menuHam = document.getElementById('menu-bar');

window.addEventListener('scroll', function () {
  let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

  // Se rolando para baixo
  if (currentScroll > lastScrollTop) {
    // Esconde o menu
    menuNav.style.top = "-80px";  // Ajuste conforme a altura do seu menu
  } else {
    // Se rolando para cima
    menuNav.style.top = "0";  // O menu aparece
  }

  // Atualiza a posição da rolagem
  lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Evita números negativos
});


// Seleciona a barra de progresso
const progressBar = document.getElementById('progress-bar');

// Função que atualiza a barra de progresso
function updateProgressBar() {
  // Obtemos a altura total do documento e a altura visível da janela
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

  // Obtém a quantidade que foi rolada
  const scrollPosition = window.scrollY;

  // Calcula a porcentagem de rolagem
  const scrollPercentage = (scrollPosition / scrollHeight) * 100;

  // Atualiza a largura da barra de progressos
  progressBar.style.width = scrollPercentage + '%';
}

// Adiciona o evento de rolagem para atualizar a barra
window.addEventListener('scroll', updateProgressBar);

// Chama a função uma vez no carregamento para garantir que a barra de progresso esteja correta desde o início
updateProgressBar();

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const menuLinks = document.getElementById('menu-links');

  if (user && user.success) {
    // Caso o usuário esteja logado, substituímos o conteúdo da div
    menuLinks.innerHTML = `
                  <a href="perfil.html">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                            class="bi bi-person" viewBox="0 0 16 16">
                            <path
                                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
                        </svg>
                    </a> 
                        
                    <div class="separator"></div>
                
                    <a href="#" id="logout-link" onclick="logout()">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor"
                            class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd"
                                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z" />
                            <path fill-rule="evenodd"
                                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z" />
                        </svg>
                    </a> 
          
      `;
  } else {
    // Caso contrário, substituímos o conteúdo com o link de login
    menuLinks.innerHTML = `
          <a href="login.html">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                        <path fill-rule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
              </svg>
          </a>
      `;
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const menuLinks = document.getElementById('menuh-links');

  if (user && user.success) {
    // Caso o usuário esteja logado, substituímos o conteúdo da div
    menuLinks.innerHTML = `
                  <li><a href="perfil.html">Perfil</a></li>
                  <li><a href="#" onclick="logout()">Sair</a></li>
          
      `;
  } else {
    // Caso contrário, substituímos o conteúdo com o link de login
    menuLinks.innerHTML = `
        <li><a href="login.html">Login</a></li>
      `;
  }
});

// Função de logout
function logout() {
  localStorage.removeItem('user');
  window.location.href = '/index.html'; // Redireciona para a página de login
}

document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('user'));
  const tipoUser = usuario?.tipos?.nome;
  const botoesHref = document.getElementById('botoes-href')

  if (tipoUser == "Admin") {
    botoesHref.innerHTML = `
          <a href="agendaAdmin.html"><button id="schedule-button">Disponibilizar horários</button></a>
          <a href="listaAdmin.html"><button id="schedule-button">Lista de horários</button></a>
      `;
  }
});

async function postFeedback() {
  // Pega o valor do feedback inserido pelo usuário
  const feedbackInput = document.getElementById("feedback-input").value;

  // Verifica se o usuário está logado **apenas quando ele tentar enviar o feedback**
  const usuario = JSON.parse(localStorage.getItem("user"));

  if (!usuario || !usuario.success) {
    alert("Usuário não autenticado. Faça o login para deixar seu feedback!");
    return;  // Interrompe a execução se o usuário não estiver logado
  }

  // Caso o usuário esteja autenticado, pega o id do usuário
  const usuarioId = usuario.id;

  // Prepara os dados para enviar
  const data = {
    descricao: feedbackInput,  // A descrição é o feedback inserido no campo de texto
    usuario: { id_usuario: usuarioId }  // Envia o id do usuário como parte do feedback
  };

  try {
    // Envia os dados para o backend via POST
    const response = await fetch("http://localhost:8080/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // Converte os dados para JSON
    });

    if (!response.ok) {
      throw new Error("Erro ao realizar o feedback.");
    }

    // Caso o POST seja bem-sucedido, exibe a mensagem de sucesso
    const feedback = await response.json();
    alert("Feedback realizado com sucesso");

    // Limpa o campo após o envio
    document.getElementById('feedback-input').value = '';

  } catch (error) {
    console.error("Erro:", error.message);
    alert("Ocorreu um erro ao cadastrar o feedback.");
  }
}
