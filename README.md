
# Agrovale

## Objetivo e Descrição da Solução

O Agrovale é um sistema web completo voltado para o setor agrícola, com foco no gerenciamento eficiente de produtos, estoque e vendas online. A plataforma foi desenvolvida pensando na simplicidade de uso tanto para clientes quanto para administradores.

O sistema está dividido em dois perfis principais de usuário:  
- **Clientes:** podem criar contas, navegar pelo catálogo de produtos disponíveis, realizar pedidos e acompanhar suas compras de forma prática e segura.  
- **Administradores:** responsáveis por gerenciar o negócio dentro da plataforma, incluindo o cadastro e atualização de produtos, controle rigoroso do estoque, além do acompanhamento e gerenciamento dos pedidos realizados pelos clientes.

Essa separação garante maior organização e segurança para o negócio, proporcionando uma experiência diferenciada para cada tipo de usuário, alinhada às suas necessidades específicas.

A solução também integra tecnologias modernas e consolidadas, como Node.js para o backend, MySQL para armazenamento de dados relacionais e Firebase para autenticação e gerenciamento em tempo real. A combinação dessas ferramentas resulta em um sistema robusto, escalável e confiável.

---

## Tecnologias Utilizadas

O Agrovale foi construído utilizando um conjunto diversificado de tecnologias, que garantem sua funcionalidade, desempenho e usabilidade:

- **HTML5, CSS3 e JavaScript:** para a construção da interface web, garantindo uma experiência responsiva, acessível e intuitiva.  
- **Node.js:** utilizado para o desenvolvimento do backend, permitindo o gerenciamento eficiente das requisições e a comunicação com o banco de dados.  
- **MySQL:** banco de dados relacional que armazena informações estruturadas, como produtos, estoque e vendas.  
- **Firebase Authentication:** utilizado para autenticação segura dos usuários, possibilitando login, cadastro e gerenciamento de sessões.  
- **Firebase Firestore:** banco de dados NoSQL em tempo real para armazenar e sincronizar dados do usuário de forma dinâmica.  
- **JSON:** formato padrão utilizado para troca e armazenamento de dados entre frontend, backend e bancos.

---

## Como Instalar e Executar o Projeto

Para colocar o Agrovale em funcionamento em sua máquina local, siga os passos detalhados abaixo:

1. **Clone o repositório:**
   Abra seu terminal e execute o comando:
   ```bash
   git clone https://github.com/seuusuario/agrovale.git
   ```
   Isso copiará todos os arquivos do projeto para o seu computador.

2. **Navegue até a pasta do projeto:**
   ```bash
   cd agrovale
   ```
   Você deve estar dentro da pasta raiz do projeto para executar os próximos passos.

3. **Instale as dependências do Node.js:**
   Certifique-se de ter o Node.js instalado em sua máquina. Em seguida, execute:
   ```bash
   npm install
   ```
   Esse comando instalará todas as bibliotecas necessárias para rodar o backend da aplicação.

4. **Configure o banco de dados MySQL:**
   - Crie um banco de dados no MySQL para o Agrovale.
   - Se houver um arquivo `.sql` com a estrutura do banco, importe-o para criar as tabelas necessárias.
   - Atualize as credenciais (usuário, senha, nome do banco, host) no arquivo de configuração do projeto para que o backend consiga se conectar corretamente.

5. **Configure o Firebase:**
   - Acesse o [Firebase Console](https://console.firebase.google.com/) e crie um novo projeto.
   - Ative o serviço de autenticação para permitir o login e cadastro de usuários.
   - Configure o Firestore para armazenar dados dinâmicos dos usuários.
   - Copie as credenciais e configure no seu projeto para garantir a integração correta com o Firebase.

6. **Inicie o servidor da aplicação:**
   Com tudo configurado, rode o comando para iniciar o servidor localmente:
   ```bash
   npm start
   ```
   O servidor iniciará e ficará escutando requisições na porta configurada (geralmente 3000).

7. **Acesse a aplicação pelo navegador:**
   Abra o navegador e entre no endereço:
   ```
   http://localhost:3000
   ```
   Você verá a interface inicial do Agrovale pronta para ser usada.

---

## Considerações Finais

Este projeto foi desenvolvido com foco em facilitar o dia a dia da empresa agrovale, automatizando processos que costumam ser feitos manualmente ou com planilhas complexas.

Com o Agrovale, espera-se promover maior controle do estoque, agilidade nas vendas e um canal direto entre clientes e administradores, tudo em uma plataforma única, intuitiva e segura.
