(async () => {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    window.location.href = 'login.html'
  }
})()


// MOCK de alunos (API)
const alunos = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Santos' }
];

let avaliacoes = [];
let alunoAtual = null;

const select = document.getElementById('alunoSelect');
const table = document.getElementById('avaliacoesTable');
const modal = document.getElementById('modal');
const form = document.getElementById('avaliacaoForm');

document.getElementById('btnAdd').onclick = () => {
  if (!alunoAtual) {
    alert('Selecione um aluno');
    return;
  }
  modal.classList.add('active');
};

document.getElementById('cancelar').onclick = () => {
  modal.classList.remove('active');
};

// Preenche alunos
alunos.forEach(a => {
  select.innerHTML += `<option value="${a.id}">${a.nome}</option>`;
});

select.onchange = e => {
  alunoAtual = e.target.value;
  render();
};

form.onsubmit = e => {
  e.preventDefault();

  const peso = Number(pesoInput.value);
  const altura = Number(alturaInput.value);
  const imc = (peso / (altura * altura)).toFixed(1);

  avaliacoes.push({
    alunoId: alunoAtual,
    data: data.value,
    peso,
    gordura: gordura.value,
    imc,
    obs: obs.value
  });

  modal.classList.remove('active');
  form.reset();
  render();
};

function render() {
  table.innerHTML = '';

  avaliacoes
    .filter(a => a.alunoId == alunoAtual)
    .forEach(a => {
      table.innerHTML += `
        <tr>
          <td>${a.data}</td>
          <td>${a.peso}</td>
          <td>${a.gordura || '-'}</td>
          <td>${a.imc}</td>
          <td>📈</td>
        </tr>
      `;
    });
}

// Inputs
const pesoInput = document.getElementById('peso');
const alturaInput = document.getElementById('altura');
