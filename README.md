# 💻 Personal Finance Manager - Front-end

Interface web desenvolvida em **Angular** para gerenciamento de finanças pessoais, permitindo o controle de entradas e saídas de dinheiro com cálculo automático do saldo total.

A aplicação consome uma API REST para persistência de dados e autenticação de usuários, oferecendo uma experiência dinâmica e responsiva no modelo SPA (Single Page Application).

---

## 🚀 Tecnologias Utilizadas

- Angular
- TypeScript
- Angular Router
- Angular HttpClient
- Reactive Forms
- Guards de rota
- CSS / SCSS
- Angular material
- Tailwind

---

## 📌 Funcionalidades

- ✅ Tela de cadastro de usuário  
- ✅ Tela de login com autenticação  
- ✅ Registro de receitas (entradas)  
- ✅ Registro de despesas (saídas)  
- ✅ Listagem de movimentações financeiras  
- ✅ Cálculo automático do saldo total  
- ✅ Proteção de rotas privadas  
- ✅ Logout do usuário  

---

## 🏗️ Estrutura da Aplicação

O projeto segue a arquitetura padrão do Angular, organizada por:

- **Components** → Telas e componentes reutilizáveis  
- **Services** → Comunicação com a API REST  
- **Guards** → Proteção de rotas autenticadas  
- **Models/Interfaces** → Tipagem das entidades  
- **Modules** → Organização estrutural da aplicação  

A comunicação com o back-end é realizada através do `HttpClient`, utilizando interceptors para envio automático do token de autenticação nas requisições protegidas.

---


## ⚙️ Como Executar

```bash
# Instalar dependências
npm install

# Executar aplicação
ng serve
```

aplicação disponivel na porta
http://localhost:4200
