// Importa módulos necessários do Firebase (Firestore e Auth)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

// Configuração do Firebase — substitua pelos seus dados reais
const firebaseConfig = {
  apiKey: "AIzaSyDa5dqtuV2sTVh07NZafHVlYBO0EtvryUM",
  authDomain: "agrovale-c4ce6.firebaseapp.com",
  projectId: "agrovale-c4ce6",
  storageBucket: "agrovale-c4ce6.appspot.com",
  messagingSenderId: "292420787522",
  appId: "1:292420787522:web:6bee092a1fcd877a257cdb",
  measurementId: "G-K4E7781SQ6"
};

// Inicializa o app Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore e Auth
const db = getFirestore(app);
const auth = getAuth(app);

const form = document.getElementById("formCadastroComplementar");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Pega usuário logado atual
  const user = auth.currentUser;
  if (!user) {
    alert("Usuário não está logado.");
    return;
  }

  // Captura dados do formulário
  const nome = document.getElementById("nome").value.trim();
  const cpf = document.getElementById("cpf").value.trim();
  const telefone = document.getElementById("telefone").value.trim();
  const cep = document.getElementById("cep").value.trim();
  const rua = document.getElementById("rua").value.trim();
  const numero = document.getElementById("numero").value.trim();
  const complemento = document.getElementById("complemento").value.trim();
  const cidade = document.getElementById("cidade").value.trim();
  const estado = document.getElementById("estado").value.trim();

  // Validação simples dos campos obrigatórios
  if (!nome || !cpf || !telefone || !cep || !rua || !numero || !cidade || !estado) {
    alert("Por favor, preencha todos os campos obrigatórios.");
    return;
  }

  try {
    // Salva no Firestore no documento do usuário (coleção 'usuariosComplementar')
    await setDoc(doc(db, "usuariosComplementar", user.uid), {
      nome,
      cpf,
      telefone,
      endereco: {
        cep,
        rua,
        numero,
        complemento,
        cidade,
        estado,
      },
      atualizadoEm: new Date()
    });

    alert("Cadastro complementar salvo com sucesso!");
    // Redireciona para home.html
    window.location.href = "home.html";
  } catch (error) {
    console.error("Erro ao salvar cadastro complementar:", error);
    alert("Erro ao salvar dados. Tente novamente.");
  }
});
