const apiUrl = 'http://localhost:3000/api/produtos'; // ajuste conforme seu back-end
const carrinho = [];

// Referências
const cartIcon = document.getElementById('cart-icon');
const carrinhoModal = document.getElementById('carrinho-modal');
const fecharCarrinho = document.getElementById('fechar-carrinho');
const carrinhoItens = document.getElementById('carrinho-itens');
const totalCarrinho = document.getElementById('total-carrinho');
const cartCount = document.getElementById('cart-count');
const inputPesquisa = document.getElementById('input-pesquisa');
const btnPesquisa = document.getElementById('btn-pesquisa');

const btnFinalizarPedido = document.getElementById('finalizar-pedido');
const btnFecharCarrinhoRodape = document.getElementById('fechar-carrinho-rodape');

// Função para renderizar os produtos
function renderizarProduto(produto) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <div class="card-img"><img src="style/img/produto.jpg" alt=""></div>
    <h3>${produto.nome}</h3>
    <p>${produto.descricao || ''}</p>
    <span>R$ ${Number(produto.preco_venda).toFixed(2)}</span>
    <button>Adicionar</button>
  `;

  card.querySelector('button').addEventListener('click', () => {
    carrinho.push(produto);
    atualizarContadorCarrinho();
    renderizarCarrinho();
  });

  return card;
}

// Carregar produtos da API
async function carregarProdutos() {
  const resposta = await fetch(apiUrl);
  const produtos = await resposta.json();

  const categorias = {
    pesca: document.getElementById('pesca'),
    ferramenta: document.getElementById('ferramenta'),
    jardinagem: document.getElementById('jardinagem'),
    petshop: document.getElementById('petshop'),
    outros: document.getElementById('outros')
  };

  produtos.forEach(produto => {
    const categoria = produto.categoria?.toLowerCase();
    if (categorias[categoria]) {
      categorias[categoria].appendChild(renderizarProduto(produto));
    } else {
      categorias.outros.appendChild(renderizarProduto(produto));
    }
  });
}

// Contador no ícone
function atualizarContadorCarrinho() {
  cartCount.textContent = carrinho.length;
}

// Mostrar carrinho
cartIcon.addEventListener('click', () => {
  carrinhoModal.classList.add('ativo');
  renderizarCarrinho();
});

// Fechar carrinho (botão topo)
fecharCarrinho.addEventListener('click', () => {
  carrinhoModal.classList.remove('ativo');
});

// Fechar carrinho (botão rodapé)
btnFecharCarrinhoRodape.addEventListener('click', () => {
  carrinhoModal.classList.remove('ativo');
});

// Finalizar pedido
// Função para consolidar produtos iguais e contar quantidade
function consolidarCarrinho(carrinho) {
  const mapa = {};
  carrinho.forEach(prod => {
    if (mapa[prod.id]) {
      mapa[prod.id].quantidade += 1;
    } else {
      mapa[prod.id] = { id: prod.id, quantidade: 1 };
    }
  });
  return Object.values(mapa);
}

// Finalizar pedido com envio ao backend
btnFinalizarPedido.addEventListener('click', async () => {
  if (carrinho.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }
  
  const usuarioLogado = sessionStorage.getItem('usuarioLogado');
  if (!usuarioLogado) {
    alert('Você precisa estar logado para finalizar o pedido.');
    return;
  }
  
  const produtosParaEnviar = consolidarCarrinho(carrinho);

  try {
    const resposta = await fetch('http://localhost:3000/api/pedidos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        uid: usuarioLogado,
        produtos: produtosParaEnviar
      })
    });

    const dados = await resposta.json();

    if (!resposta.ok) {
      alert(`Erro ao criar pedido: ${dados.error || 'Desconhecido'}`);
      return;
    }

    alert('Pedido finalizado com sucesso! Número do pedido: ' + (dados.pedidoId || ''));

    // Limpar carrinho
    carrinho.length = 0; 
    atualizarContadorCarrinho();
    renderizarCarrinho();

    // Fechar modal
    carrinhoModal.classList.remove('ativo');

  } catch (error) {
    console.error('Erro ao finalizar pedido:', error);
    alert('Erro na comunicação com o servidor.');
  }
});

// Renderizar carrinho
function renderizarCarrinho() {
  carrinhoItens.innerHTML = '';
  let total = 0;

  carrinho.forEach((item, index) => {
    const div = document.createElement('div');
    div.classList.add('item-carrinho');
    div.style.display = 'flex';
    div.style.justifyContent = 'space-between';
    div.style.marginBottom = '10px';

    div.innerHTML = `
      <span>${item.nome}</span>
      <span>R$ ${Number(item.preco_venda).toFixed(2)}</span>
      <button data-index="${index}" style="color:red; background:none; border:none; cursor:pointer;">x</button>
    `;

    carrinhoItens.appendChild(div);
    total += Number(item.preco_venda);
  });

  totalCarrinho.textContent = total.toFixed(2);

  carrinhoItens.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', e => {
      const i = e.target.dataset.index;
      carrinho.splice(i, 1);
      atualizarContadorCarrinho();
      renderizarCarrinho();
    });
  });
}

// Pesquisa
btnPesquisa.addEventListener('click', async () => {
  const termo = inputPesquisa.value.toLowerCase();
  const resposta = await fetch(apiUrl);
  const produtos = await resposta.json();

  Object.values(document.querySelectorAll('.carrossel')).forEach(div => div.innerHTML = '');

  produtos
    .filter(p => p.nome.toLowerCase().includes(termo))
    .forEach(p => {
      const categoria = p.categoria?.toLowerCase();
      const target = document.getElementById(categoria) || document.getElementById('outros');
      target.appendChild(renderizarProduto(p));
    });
});

carregarProdutos();
