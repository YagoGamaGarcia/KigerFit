//(async () => {
//  const { data: { session } } = await supabase.auth.getSession()
//
//  if (!session) {
//    window.location.href = 'login.html'
//  }
//})()

let alunos = [];
let editId = null;

const table = document.getElementById('alunosTable');
const modal = document.getElementById('modal');
const form = document.getElementById('alunoForm');
const search = document.getElementById('search');

document.getElementById('btnAdd').onclick = () => openModal();
document.getElementById('cancelar').onclick = closeModal;

function openModal(aluno = null) {
  modal.classList.add('active');

  if (aluno) {
    document.getElementById('modalTitle').innerText = 'Editar Aluno';
    document.getElementById('nome').value = aluno.nome;
    document.getElementById('objetivo').value = aluno.objetivo;
    document.getElementById('status').value = aluno.status;
    editId = aluno.id;
  } else {
    form.reset();
    editId = null;
  }
}

function closeModal() {
  modal.classList.remove('active');
}

form.onsubmit = e => {
  e.preventDefault();

  const aluno = {
    id: editId ?? Date.now(),
    nome: nome.value,
    objetivo: objetivo.value,
    status: status.value
  };

  if (editId) {
    alunos = alunos.map(a => a.id === editId ? aluno : a);
  } else {
    alunos.push(aluno);
  }

  closeModal();
  render();
};

function render(filtro = '') {
  table.innerHTML = '';

  alunos
    .filter(a => a.nome.toLowerCase().includes(filtro))
    .forEach(aluno => {
      table.innerHTML += `
        <tr>
          <td>${aluno.nome}</td>
          <td>${aluno.objetivo}</td>
          <td>${aluno.status}</td>
          <td class="actions-btns">
            <button onclick='edit(${aluno.id})'>✏️</button>
            <button onclick='remove(${aluno.id})'>🗑️</button>
          </td>
        </tr>
      `;
    });
}

function edit(id) {
  const aluno = alunos.find(a => a.id === id);
  openModal(aluno);
}

function remove(id) {
  if (confirm('Remover aluno?')) {
    alunos = alunos.filter(a => a.id !== id);
    render();
  }
}

search.oninput = e => render(e.target.value.toLowerCase());
