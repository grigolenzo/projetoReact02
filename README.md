
-----

# ✨ TechLoja - Um Estudo de CSS em React

## 📄 Sobre o Projeto

Este projeto é uma aplicação front-end construída com **React** e **Vite**, com o objetivo principal de explorar e comparar quatro metodologias de estilização em um único projeto de e-commerce e gestão de tarefas.

A aplicação é dividida em quatro versões, cada uma utilizando uma técnica diferente de CSS:

  * **01-css-global:** Estilização com CSS global puro.
  * **02-css-modules:** Estilização com CSS Modules para isolamento de escopo.
  * **03-tailwind:** Estilização com a abordagem de utilidade-primeiro do Tailwind CSS.
  * **04-styled-components:** Estilização com CSS-in-JS usando Styled Components.

## 🚀 Funcionalidades

O projeto inclui as seguintes funcionalidades interativas, mantendo a consistência visual em todas as versões:

  * **🛒 Catálogo de Produtos:** Um grid responsivo de 6 produtos.
  * **📋 Quadro Kanban:** Uma interface interativa com drag-and-drop para gerenciamento de tarefas.
  * **🌙 Alternância de Tema:** Botão para alternar entre os modos claro e escuro, com persistência no `localStorage`.
  * **📦 Estilos de Componentes:** Cards de produto com estados de `hover`, `focus`, `disabled` e `loading` (esqueleto).
  * **🖥️ Design Responsivo:** O layout se adapta a diferentes tamanhos de tela (mobile, tablet, desktop).

## 🛠️ Tecnologias Utilizadas

  * **React:** Biblioteca JavaScript para a interface do usuário.
  * **Vite:** Ferramenta de build rápida e leve.
  * **React Router:** Gerenciamento de roteamento da aplicação.
  * **Styled Components, Tailwind CSS:** Bibliotecas de estilização (em suas respectivas versões).

## ⚙️ Como Rodar o Projeto

Para testar o projeto na sua máquina, siga os passos abaixo.

### Pré-requisitos

  * **Node.js** e **npm** instalados.

### Instruções

1.  **Clone o Repositório:**

    ```bash
    git clone [Url do git desse projeto]
    ```

2.  **Navegue até a Pasta Desejada:**
    Entre na pasta do projeto que você quer testar (ex: `04-styled-components`).

    ```bash
    cd projeto-css/04-styled-components
    ```

3.  **Instale as Dependências:**

    ```bash
    npm install
    ```

4.  **Inicie o Servidor de Desenvolvimento:**

    ```bash
    npm run dev
    ```

O seu navegador padrão abrirá automaticamente a aplicação em `http://localhost:5173`.
