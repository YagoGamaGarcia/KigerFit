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

// MOCK avaliações
const avaliacoes = [
  { alunoId: 1, data: 'Jan', peso: 85, gordura: 25, imc: 28 },
  { alunoId: 1, data: 'Fev', peso: 83, gordura: 23, imc: 27 },
  { alunoId: 1, data: 'Mar', peso: 81, gordura: 22, imc: 26 },

  { alunoId: 2, data: 'Jan', peso: 68, gordura: 30, imc: 26 },
  { alunoId: 2, data: 'Fev', peso: 66, gordura: 28, imc: 25 }
];

const select = document.getElementById('alunoSelect');

// Preenche alunos
alunos.forEach(a => {
  select.innerHTML += `<option value="${a.id}">${a.nome}</option>`;
});

let pesoChart, gorduraChart, imcChart;

select.onchange = e => {
  const alunoId = Number(e.target.value);
  if (!alunoId) return;

  const dados = avaliacoes.filter(a => a.alunoId === alunoId);
  renderCharts(dados);
};

function renderCharts(dados) {
  const labels = dados.map(d => d.data);

  destroyCharts();

  pesoChart = new Chart(document.getElementById('pesoChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Peso',
        data: dados.map(d => d.peso),
        tension: 0.4
      }]
    }
  });

  gorduraChart = new Chart(document.getElementById('gorduraChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: '% Gordura',
        data: dados.map(d => d.gordura),
        tension: 0.4
      }]
    }
  });

  imcChart = new Chart(document.getElementById('imcChart'), {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'IMC',
        data: dados.map(d => d.imc),
        tension: 0.4
      }]
    }
  });
}

function destroyCharts() {
  pesoChart && pesoChart.destroy();
  gorduraChart && gorduraChart.destroy();
  imcChart && imcChart.destroy();
}
