//(async () => {
//  const { data: { session } } = await supabase.auth.getSession()
//
//  if (!session) {
//    window.location.href = 'login.html'
//  }
//})()


// MOCK alunos
const alunos = [
  { id: 1, nome: 'João Silva' },
  { id: 2, nome: 'Maria Santos' }
];

let treinos = [];
let alunoAtual = null;

const select = document.getElementById('alunoSelect');
const container = document.getElementById('treinosContainer');
const modal = document.getElementById('modal');
const exerciciosDiv = document.getElementById('exercicios');

document.getElementById('btnNovoTreino').onclick = () => {
  if (!alunoAtual) {
    alert('Selecione um aluno');
    return;
  }
  modal.classList.add('active');
};

document.getElementById('cancelar').onclick = () => {
  modal.classList.remove('active');
  exerciciosDiv.innerHTML = '';
};

// Preenche alunos
alunos.forEach(a => {
  select.innerHTML += `<option value="${a.id}">${a.nome}</option>`;
});

select.onchange = e => {
  alunoAtual = e.target.value;
  render();
};

// Adiciona exercício
document.getElementById('addExercicio').onclick = () => {
  exerciciosDiv.innerHTML += `
    <div class="exercicio-form">
      <input placeholder="Exercício">
      <input placeholder="Séries">
      <input placeholder="Reps">
      <input placeholder="Descanso">
      <button type="button" onclick="this.parentElement.remove()">❌</button>
    </div>
  `;
};

// Salva treino
document.getElementById('treinoForm').onsubmit = e => {
  e.preventDefault();

  const tipo = document.getElementById('tipo').value;
  const exercicios = [...document.querySelectorAll('.exercicio-form')]
    .map(div => {
      const inputs = div.querySelectorAll('input');
      return {
        nome: inputs[0].value,
        series: inputs[1].value,
        reps: inputs[2].value,
        descanso: inputs[3].value
      };
    });

  treinos.push({
    alunoId: alunoAtual,
    tipo,
    exercicios
  });

  modal.classList.remove('active');
  exerciciosDiv.innerHTML = '';
  e.target.reset();
  render();
};

// Render
function render() {
  container.innerHTML = '';

  treinos
    .filter(t => t.alunoId == alunoAtual)
    .forEach(t => {
      container.innerHTML += `
        <div class="treino">
          <h3>Treino ${t.tipo}</h3>
          ${t.exercicios.map(e => `
            <div class="exercicio">
              <span>${e.nome}</span>
              <span>${e.series}</span>
              <span>${e.reps}</span>
              <span>${e.descanso}</span>
            </div>
          `).join('')}
        </div>
      `;
    });
}
