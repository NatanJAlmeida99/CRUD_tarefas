# 📝 API de Gerenciamento de Tarefas (To-Do List)

API REST desenvolvida em Node.js com TypeScript e Express para gerenciamento de tarefas (CRUD completo), contando com filtros de busca por query parameters, validações nativas e importação em massa de registros a partir de arquivos CSV utilizando Streams.

---

## 🚀 Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **csv-parse** (Leitura e processamento de arquivos CSV via Streams)
- **tsx** (Execução de arquivos TypeScript em ambiente de desenvolvimento)

---

## 📂 Estrutura do Projeto

```text
├── src/
│   ├── controllers/
│   │   └── TarefaController.ts   # Regras de negócio, validações e manipulação dos dados
│   ├── routes/
│   │   └── tarefaRoutes.ts       # Definição dos endpoints da aplicação
│   ├── streams/
│   │   └── import-csv.ts         # Script de importação em massa via CSV
│   ├── types/
│   │   └── tarefa.ts             # Tipagem (Interface) da entidade Tarefa
│   └── server.ts                 # Configuração e inicialização do servidor Express
├── tasks.csv                     # Arquivo CSV de exemplo para importação
├── package.json
└── tsconfig.json
```

---

## ⚙️ Como Executar o Projeto

### 1. Pré-requisitos
Certifique-se de ter o [Node.js](https://nodejs.org/) instalado em sua máquina.

### 2. Instalação
Clone o repositório e instale as dependências:

```bash
git clone https://github.com/NatanJAlmeida99/CRUD_tarefas
cd CRUD_tarefas
npm install
```

### 3. Rodando o Servidor
Inicie a API em modo de desenvolvimento:

```bash
npx tsx watch src/server.ts
```

O servidor estará disponível em `http://localhost:3000`.

---

## 📌 Endpoints da API

### 1. Listar Tarefas
Retorna todas as tarefas cadastradas. Permite filtrar por título e/ou descrição (busca parcial e case-insensitive).

- **Rota:** `GET /tarefas`
- **Query Params (opcionais):**
  - `title`: Filtra pelo título da tarefa (ex: `/tarefas?title=estudar`)
  - `description`: Filtra pela descrição da tarefa (ex: `/tarefas?description=mercado`)
- **Resposta (`200 OK`):**

```json
[
  {
    "id": 1,
    "title": "Estudar TypeScript",
    "description": "Revisar interfaces, tipos e generics",
    "completed_at": null,
    "created_at": "2026-11-24T21:00:00.000Z",
    "updated_at": "2026-11-24T21:00:00.000Z"
  }
]
```

### 2. Criar Tarefa
Cria uma nova tarefa.

- **Rota:** `POST /tarefas`
- **Body (`application/json`):**

```json
{
  "title": "Fazer deploy da API",
  "description": "Publicar o projeto no GitHub"
}
```

- **Resposta (`201 Created`):** Retorna o objeto da tarefa criada.

### 3. Atualizar Tarefa
Atualiza o `title` e/ou a `description` de uma tarefa existente pelo seu ID.

- **Rota:** `PUT /tarefas/:id`
- **Body (`application/json`):** *(Envie pelo menos um dos campos)*

```json
{
  "title": "Novo título da tarefa",
  "description": "Nova descrição"
}
```

- **Resposta (`200 OK`):** Retorna a tarefa atualizada.

### 4. Marcar / Desmarcar Tarefa como Concluída
Alterna o estado de conclusão (`completed_at`) de uma tarefa específica.

- **Rota:** `PATCH /tarefas/:id/complete`
- **Resposta (`200 OK`):** Retorna a tarefa com `completed_at` preenchido com a data atual ou `null`.

### 5. Remover Tarefa
Exclui uma tarefa pelo seu ID.

- **Rota:** `DELETE /tarefas/:id`
- **Resposta (`204 No Content`):** Sem conteúdo no corpo da resposta.

---

## 📥 Importação de Tarefas via CSV

O projeto inclui um script separado que lê o arquivo `tasks.csv` linha por linha utilizando **Node.js Streams** e envia cada registro para a rota `POST /tarefas`.

Com o servidor rodando em um terminal, abra um segundo terminal e execute:

```bash
npx tsx src/streams/import-csv.ts
```

Formato esperado no arquivo `tasks.csv`:

```csv
title,description
Task 01,Descrição da Task 01
Task 02,Descrição da Task 02
```