document.addEventListener('DOMContentLoaded', () => {
  const categorias = {
    Pesca: document.getElementById('pesca'),
    Ferramenta: document.getElementById('ferramenta'),
    Jardinagem: document.getElementById('jardinagem'),
    Petshop: document.getElementById('petshop'),
    Outros: document.getElementById('outros')
  };

  const searchInput = document.querySelector('.search-bar input');
  const cartCount = document.getElementById('cart-count');

  let produtos = [];
  let carrinho = [];

  function mostrarProdutos(filtrados) {
    // Limpa todos os carrosséis
    Object.values(categorias).forEach(div => div.innerHTML = '');

    filtrados.forEach(produto => {
      const categoria = produto.categoria || 'Outros';
      const destino = categorias[categoria] || categorias.Outros;

      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <img src="https://via.placeholder.com/200x250?text=${encodeURIComponent(produto.nome)}" alt="${produto.nome}">
        <p class="nome-produto">${produto.nome}</p>
        <p class="preco">R$ ${parseFloat(produto.preco_venda).toFixed(2)}</p>
        <button class="btn-add-cart" data-id="${produto.id}" title="Adicionar ao carrinho">
          <i class='bx bx-cart'></i>
        </button>
      `;

      destino.appendChild(card);
    });

    // Adicionar evento para todos os botões "Adicionar ao carrinho"
    document.querySelectorAll('.btn-add-cart').forEach(botao => {
      botao.addEventListener('click', () => {
        const idProduto = botao.getAttribute('data-id');
        adicionarAoCarrinho(idProduto);
      });
    });
  }

  function adicionarAoCarrinho(id) {
    const produto = produtos.find(p => p.id == id);
    if (!produto) return;

    // Verifica se produto já está no carrinho
    const itemNoCarrinho = carrinho.find(item => item.id == id);
    if (itemNoCarrinho) {
      itemNoCarrinho.quantidade++;
    } else {
      carrinho.push({ ...produto, quantidade: 1 });
    }

    atualizarContadorCarrinho();
  }

  function atualizarContadorCarrinho() {
    const totalItens = carrinho.reduce((acc, item) => acc + item.quantidade, 0);
    if (totalItens > 0) {
      cartCount.style.display = 'inline-block';
      cartCount.textContent = totalItens;
    } else {
      cartCount.style.display = 'none';
    }
  }

  // Buscar produtos da API
  fetch('http://localhost:3000/api/produtos')
    .then(res => res.json())
    .then(dados => {
      produtos = dados;
      mostrarProdutos(produtos);
    })
    .catch(err => console.error('Erro ao buscar produtos:', err));

  // Pesquisa dinâmica conforme digita
  searchInput.addEventListener('input', () => {
    const termo = searchInput.value.toLowerCase();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    mostrarProdutos(filtrados);
  });
});
