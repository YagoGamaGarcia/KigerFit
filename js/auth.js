const form = document.getElementById('loginForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  // Simulação de login
  alert('Login realizado com sucesso (simulação)');

  // Futuro:
  // validar credenciais
  // criar sessão
  // redirecionar para dashboard
  // window.location.href = 'dashboard.html';
});
