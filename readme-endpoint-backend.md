# SWCS Backend — Referência de Endpoints

> Base URL: `http://localhost:3333` | Última atualização: 2026-03-15

---

## Autenticação

Todas as rotas (exceto `/auth/*`) requerem o header:

```
Authorization: Bearer <accessToken>
```

---

## Formato Geral

### Request body → **sempre camelCase**
### Response body → **sempre camelCase**

**Resposta de sucesso (lista):**
```json
{ "data": [...], "meta": { "total": 0 } }
```

**Resposta de sucesso (single / mutation):**
```json
{ "mensagem": "...", "data": { ... } }
```

**Resposta de erro (4xx / 5xx):**
```json
{ "statusCode": 400, "error": "Bad Request", "message": "..." }
```

**Datas:** formato ISO 8601 — `"2026-03-15T08:00:00.000Z"`

---

## Tipos Comuns

```typescript
interface PaginatedResponse<T> {
  data: T[];
  meta: {
    total: number;
    page?: number;
    limit?: number;
    totalPages?: number;
    hasNext?: boolean;
    hasPrev?: boolean;
    porEstado?: Record<string, number>;   // presenças
    porCargo?: Record<string, number>;    // funcionários
  };
}
```

---

## Auth — `/auth`

| Rota | Método | Body | Resposta | Auth |
|---|---|---|---|---|
| `/auth/login` | POST | `{ email, senha, tipo? }` | `{ accessToken, refreshToken, usuario }` | Não |
| `/auth/refresh` | POST | `{ refreshToken }` | `{ accessToken, refreshToken, usuario }` | Não |
| `/auth/forgot-password` | POST | `{ email }` | `{ mensagem }` | Não |
| `/auth/reset-password` | POST | `{ token, novaSenha, confirmarSenha }` | `{ mensagem }` | Não |
| `/auth/logout` | POST | — | `{ mensagem }` | Sim |

> `tipo` é opcional no login (o servidor deteta automaticamente `PROFESSOR` ou `FUNCIONARIO`).

---

## Usuários — `/usuarios`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/usuarios` | GET | `?search=` | `{ data: [Usuario] }` | Sim |
| `/usuarios/:id` | GET | — | `{ data: Usuario }` | Sim |
| `/usuarios/:id` | PUT | `{ nome?, email? }` | `{ mensagem, data }` | Sim |
| `/usuarios/:id/senha` | PUT | `{ senhaAtual, novaSenha, confirmarSenha }` | `{ mensagem }` | Sim |

**Tipo `Usuario` (resposta):**
```typescript
{
  usuarioId: number;
  nome: string;
  email: string;
  tipo: "FUNCIONARIO" | "PROFESSOR" | "SUMARISTA";
  permissoes: Array<{ permissao: { permissaoId: number; descricao: string } }>;
  professor?: { departamento: string };
  funcionario?: { cargo: string };
}
```

---

## Professores — `/professores`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/professores` | GET | `?search=&departamento=` | `{ data: [Professor] }` | Sim |
| `/professores` | POST | `{ nome, email, senha, departamento, cargaHoraria }` | `{ mensagem, data }` | Sim |
| `/professores/:id` | GET | — | `{ data: Professor }` | Sim |
| `/professores/:id` | PUT | `{ nome?, email?, departamento?, cargaHoraria? }` | `{ mensagem, data }` | Sim |

**Enums:** `departamento` → `"INFORMATICA" | "OUTROS"`

**Tipo `Professor` (resposta):**
```typescript
{
  professorId: number;
  nome: string;
  departamento: "INFORMATICA" | "OUTROS";
  cargaHoraria: number;
  usuario?: { email: string; permissoes: [...] };
  cursos?: Array<{ curso: { cursoId: number; nome: string } }>;
}
```

---

## Funcionários — `/funcionarios`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/funcionarios` | GET | `?search=&cargo=` | `{ data: [Funcionario], meta: { total, porCargo } }` | Sim |
| `/funcionarios` | POST | `{ nome, email, senha, cargo }` | `{ mensagem, data }` | Sim |
| `/funcionarios/:id` | GET | — | `{ data: Funcionario }` | Sim |
| `/funcionarios/:id` | PUT | `{ nome?, email?, cargo? }` | `{ mensagem, data }` | Sim |

**Enums:** `cargo` → `"SUMARISTA" | "SECRETARIO" | "ADMINISTRATIVO" | "OUTROS"`

---

## Cursos — `/cursos`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/cursos` | GET | `?search=&departamento=` | `{ data: [Curso], meta: { total } }` | Sim |
| `/cursos` | POST | `{ nome, descricao?, professorId }` | `{ mensagem, data }` | Sim |
| `/cursos/:id` | GET | — | `{ data: Curso }` | Sim |
| `/cursos/:id` | PUT | `{ nome?, descricao?, professorId? }` | `{ mensagem, data }` | Sim |
| `/cursos/:id` | DELETE | — | `{ mensagem }` | Sim |
| `/cursos/departamento` | GET | `?departamento=` | `{ data: [Curso] }` | Sim |

**Tipo `Curso` (resposta):**
```typescript
{
  cursoId: number;
  nome: string;
  descricao: string | null;
  professores?: Array<{ professorId: number; nome: string; email: string; departamento: string }>;
  _count?: { sumarios: number };
}
```

---

## Sumários — `/sumarios`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/sumarios` | GET | `?page=&limit=&search=&cursoId=&professorId=&dataInicio=&dataFim=` | `{ data: [Sumario], meta: { total, page, limit, totalPages, hasNext, hasPrev } }` | Sim |
| `/sumarios` | POST | `{ conteudo, data, cursoId, professorId }` | `{ mensagem, data }` | Sim |
| `/sumarios/:id` | GET | — | `{ data: Sumario }` | Sim |
| `/sumarios/:id` | PUT | `{ conteudo?, data?, cursoId?, professorId? }` | `{ mensagem, data }` | Sim |
| `/sumarios/:id` | DELETE | — | `{ mensagem }` | Sim |

> Regras: `conteudo` entre 3 e 2000 chars; `data` não pode ser futura; professor deve estar associado ao curso.

---

## Presenças — `/presencas`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/presencas` | GET | `?inicio=&fim=&estado=&professorId=` | `{ data: [Presenca], meta: { total, porEstado, periodo? } }` | Sim |
| `/presencas` | POST | `{ data, professorId, cursoId, estado }` | `{ mensagem, data }` | Sim |
| `/presencas/batch` | POST | `{ presencas: [{ data, professorId, cursoId, estado }] }` | `{ mensagem, data: { registrosCriados } }` | Sim |
| `/presencas/:id` | GET | — | `{ data: Presenca }` | Sim |
| `/presencas/:id` | PUT | `{ data?, professorId?, cursoId?, estado? }` | `{ mensagem, data }` | Sim |
| `/presencas/:id` | DELETE | — | `{ mensagem }` | Sim |
| `/presencas/professor/:id` | GET | `?inicio=&fim=&estado=` | `{ data: [Presenca], meta }` | Sim |

**Enums:** `estado` → `"PRESENTE" | "FALTA"`

---

## Efetividades — `/efetividades`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/efetividades` | GET | — | `{ data: [Efetividade] }` | Sim |
| `/efetividades` | POST | `{ data, horasTrabalhadas, professorId, cursoId }` | `{ mensagem, data }` | Sim |
| `/efetividades/:id` | GET | — | `{ data: Efetividade }` | Sim |
| `/efetividades/:id` | PUT | `{ data?, horasTrabalhadas?, professorId?, cursoId? }` | `{ mensagem, data }` | Sim |
| `/efetividades/:id` | DELETE | — | `{ mensagem }` | Sim |
| `/efetividades/periodo` | GET | `?dataInicio=&dataFim=` | `{ data: [...], meta: { periodo, total, estatisticas? } }` | Sim |
| `/efetividades/professor/:id` | GET | `?inicio=&fim=` | `{ data: [...], meta: { professor, estatisticas: { totalHoras, mediaDiaria, totalDias } } }` | Sim |

> `horasTrabalhadas` entre 0 e 24; não pode exceder `cargaHoraria` do professor.

---

## Permissões — `/permissoes`

| Rota | Método | Body / Query | Resposta | Auth |
|---|---|---|---|---|
| `/permissoes` | GET | — | `{ data: [Permissao] }` | Sim |
| `/permissoes` | POST | `{ descricao }` | `{ mensagem, data }` | Sim |
| `/permissoes/atribuir` | POST | `{ usuarioId, permissaoId }` | `{ mensagem }` | Sim |
| `/permissoes/usuario/:id` | GET | — | `{ data: [UsuarioPermissao] }` | Sim |

---

## Dashboard — `/dashboard`

| Rota | Método | Query | Resposta | Auth |
|---|---|---|---|---|
| `/dashboard/stats` | GET | — | `{ ... stats ... }` | Sim |

---

## Relatórios — `/reports`

| Rota | Método | Query | Resposta | Auth |
|---|---|---|---|---|
| `/reports/presencas-por-mes` | GET | `?startDate=&endDate=&departamento?=` | `{ data: [...] }` | Sim |

---

## Observações

- Para schema completo, ativar `SWAGGER_ENABLED=true` no `.env` do backend e aceder a `http://localhost:3333/docs`
- Erros de validação Zod retornam `400` com detalhes dos campos inválidos
- Todos os IDs são números inteiros positivos