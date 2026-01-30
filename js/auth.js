  //const form = document.getElementById('loginForm');

  //form.addEventListener('submit', function (e) {
  //e.preventDefault();

  // Simulação de login
  //  alert('Login realizado com sucesso (simulação)');

  // Futuro:
  // validar credenciais
  // criar sessão
  // redirecionar para dashboard
  // window.location.href = 'dashboard.html';
  //});

const { data, error } = await supabase.auth.signUp({
  email,
  password
})

if (error) {
  alert(error.message)
  return
}

const user = data.user

await supabase.from('profiles').insert({
  id: user.id,
  nome: nome,
  email: email
})
