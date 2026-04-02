# 📚 StyleManager - Documentação Técnica Completa

> **Guia definitivo** do projeto: arquitetura, stack, decisões e código explicado linha por linha

---

## 🎯 1. VISÃO GERAL DO PROJETO

### O que é?
API REST para gerenciamento de agendamentos em barbearias/salões de beleza.

### Problema que resolve:
- Clientes veem horários disponíveis
- Fazem agendamentos online
- Recebem confirmação por e-mail
- Sistema valida regras de negócio (antecedência mínima, limite de dias)

### Fluxo principal:
```
Cliente → Vê horários livres → Escolhe → Recebe e-mail → Confirma → Agendamento salvo
```

---

## 🛠️ 2. STACK TECNOLÓGICA (E POR QUÊ)

### Backend Framework: **Fastify**
```typescript
// Por que Fastify e não Express?
// ✅ 2x mais rápido que Express
// ✅ Validação nativa com schemas
// ✅ TypeScript first-class
// ✅ Plugin system robusto
```

**Decisão:** Performance + Type-safety = Fastify

---

### ORM: **Prisma**
```typescript
// Por que Prisma?
// ✅ Type-safety automático (sabe os campos do banco)
// ✅ Migrations automáticas
// ✅ Prisma Studio (GUI para ver dados)
// ✅ Fácil de aprender
```

**Arquivo chave:** `prisma/schema.prisma`

```prisma
// Define o modelo de dados
model Clientes {
  id    String @id @default(uuid())  // ID único automático
  name  String                       // Nome do cliente
  email String @unique               // Email único (não pode repetir)
  senha String                       // Senha (será hasheada)
  
  Agendamentos Agendamentos[]        // Relação 1:N (1 cliente → N agendamentos)
}
```

**Como funciona na prática:**
```typescript
// src/lib/prisma.ts
import {PrismaClient} from "@prisma/client";

export const prisma = new PrismaClient({
    // log: ['query'],  // Descomente para ver SQL no console
})

// Agora em qualquer arquivo:
import { prisma } from './lib/prisma'

// TypeScript já sabe todos os campos!
const user = await prisma.clientes.create({
    data: {
        name: "João",
        email: "joao@email.com",
        senha: "hash..."
    }
})
// user.name ← TypeScript autocompleta!
```

---

### Validação: **Zod**
```typescript
// Por que Zod?
// ✅ Valida dados em runtime (não só TypeScript)
// ✅ Gera tipos TypeScript automaticamente
// ✅ Mensagens de erro claras

// Exemplo real do projeto:
import z from "zod";

const userSchema = z.object({
    name: z.string().min(3),        // Mínimo 3 caracteres
    email: z.string().email(),      // Valida formato email
    senha: z.string().min(3)
});

// TypeScript infere o tipo automaticamente:
type User = z.infer<typeof userSchema>
// { name: string, email: string, senha: string }

// Valida em runtime:
const result = userSchema.parse(request.body)
// ❌ Se inválido → throw error
// ✅ Se válido → retorna objeto tipado
```

---

### Autenticação: **JWT + Bcrypt**
```typescript
// JWT = Token que prova identidade
// Bcrypt = Hash de senha (irreversível)

// 1. CADASTRO - Hasheia senha
import bcrypt from "bcrypt";

const hasedPassword = await bcrypt.hash("senha123", 10);
// "senha123" → "$2b$10$xYz..." (irreversível!)

// 2. LOGIN - Compara senha
const match = await bcrypt.compare("senha123", hasedPassword);
// true ✅ ou false ❌

// 3. GERA TOKEN JWT
import jwt from "@fastify/jwt";

const token = server.jwt.sign({ 
    sub: user.id,      // subject = ID do usuário
    email: user.email 
}, { expiresIn: '2h' })

// Token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

**Por que JWT?**
- Cliente guarda o token (não precisa sessão no servidor)
- Stateless (escalável)
- Decodificável sem database (rápido)

---

### Datas: **Day.js**
```typescript
// Por que Day.js e não Date nativo?
// ✅ API mais simples
// ✅ Manipulação fácil de datas
// ✅ Leve (2KB)

import dayjs from "dayjs";

const hoje = dayjs();
const amanha = dayjs().add(1, 'day');
const formatado = dayjs().format("DD/MM/YYYY");
```

---

### E-mail: **Nodemailer**
```typescript
// Envia e-mails
// Usa Ethereal (fake email para testes)

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: { user: "...", pass: "..." }
});

await transporter.sendMail({
    from: "barbearia@email.com",
    to: "cliente@email.com",
    subject: "Confirme seu agendamento",
    html: `<a href="${linkConfirmacao}">Clique aqui</a>`
});
```

---

## 🏗️ 3. ARQUITETURA DE PASTAS

```
src/
├── server.ts              # ⭐ Entrada da aplicação
├── env.ts                 # Validação de variáveis de ambiente
│
├── lib/                   # Bibliotecas configuradas
│   ├── prisma.ts          # Cliente Prisma
│   └── mails.ts           # Configuração Nodemailer
│
├── types/                 # Tipos TypeScript
│   ├── fastifyTyped.ts    # Fastify com tipos customizados
│   └── plugins-type.d.ts  # Declarações de plugins
│
├── plugin/                # Plugins Fastify
│   └── authenticate-plugin.ts  # JWT + Cookie
│
├── middleware/            # Middlewares
│   └── authenticator.ts   # Valida token em rotas protegidas
│
├── services/              # Lógica de negócio complexa
│   └── authServices.ts    # Autenticação (login, tokens)
│
├── functions/             # Funções puras e reutilizáveis
│   ├── users/             # Lógica de usuários
│   ├── days/              # Lógica de dias/horários
│   └── filters/           # Filtros de dados
│
└── routes/                # Rotas da API
    ├── user/              # Endpoints de usuário
    └── schedules/         # Endpoints de agendamento
```

### **Filosofia da arquitetura:**
- **Routes:** Recebe request, chama functions, retorna response
- **Functions:** Lógica pura (recebe dados, retorna dados)
- **Services:** Orquestra múltiplas functions
- **Middleware:** Executa ANTES das rotas (autenticação, logs)

---

## 🔐 4. AUTENTICAÇÃO - EXPLICADA LINHA POR LINHA

### 4.1 Plugin de Autenticação
**Arquivo:** `src/plugin/authenticate-plugin.ts`

```typescript
import fp from "fastify-plugin";
import jwt from "@fastify/jwt";
import cookie from "@fastify/cookie";
import { env } from "../env";

// fp() = fastify-plugin → encapsula funcionalidades
export default fp(async (server: FastifyInstance) => {
    
    // PASSO 1: Registra plugin de cookies
    server.register(cookie);
    
    // PASSO 2: Registra JWT com configurações
    server.register(jwt, {
        secret: env.SECRET_KEY,       // Chave secreta (no .env)
        sign: { expiresIn: "2h"}      // Tokens expiram em 2 horas
    })

    // PASSO 3: Cria método "authenticate" no Fastify
    // Pode ser chamado em rotas protegidas
    server.decorate("authenticate", async (request, reply) => {
       try {
            // Verifica se o token é válido
            await request.jwtVerify();
            // ✅ Se válido: continua
       } catch (error) {
            // ❌ Se inválido: retorna erro
            return reply.status(500).send({message: "Token Invalido!"})
       } 
    })
})
```

**Como é registrado:**
```typescript
// src/server.ts
server.register(authenticatePlugin)  // Agora server.authenticate() existe!
```

---

### 4.2 Cadastro de Usuário
**Arquivo:** `src/routes/user/Create-user.ts`

```typescript
export function PostUser(server: FastifyTypedInstance){
    server.post("/cadastrar", {
        schema: {
            // Define o formato esperado do body
            body: z.object({
                name: z.string().min(3),
                email: z.string().email(),
                senha: z.string().min(3)
            }),
            description: "Cadastro de usuarios!",
            // Define formato das respostas (para Swagger)
            response: {
                201: z.object({ name: z.string(), email: z.string() }),
                500: z.object({ error: z.string() })
            }
        }
    }, async (request, reply) => {
        try {
            const {name, email, senha} = request.body;
            
            // Chama função que cria usuário
            const user = await handlerCreateUser({name, email, senha})
            
            // Remove senha e id da resposta (segurança)
            const {senha:_, id:__, ...formatedUser} = user
            
            return reply.status(201).send(formatedUser);
        } catch(error) {
            return reply.status(500).send({error: "Erro inesperado!"})
        }
    })
}
```

**A função que cria:**
```typescript
// src/functions/users/handleCreateUser.ts
export async function handlerCreateUser({name, email, senha}) {
    
    // 1. Verifica se email já existe
    const existUser = await prisma.clientes.findUnique({ 
        where: { email } 
    })
    if(existUser){ 
        throw new Error("Email já utilizado!") 
    }

    // 2. Hasheia a senha (NUNCA salva senha em texto puro!)
    const hasedPassword = await bcrypt.hash(senha, 10);
    // "senha123" → "$2b$10$XyZ..." (irreversível)

    // 3. Cria no banco
    return await prisma.clientes.create({
        data: {
            name,
            email,
            senha: hasedPassword  // Salva hasheada
        }
    })
}
```

---

### 4.3 Login
**Arquivo:** `src/routes/user/Login-user.ts`

```typescript
export function GetUser(server: FastifyTypedInstance){
    server.post("/login", {
        schema: {
            body: z.object({
                email: z.string().email(),
                senha: z.string(),
            }),
            response: {
                201: z.object({ acessToken: z.string() }),
                401: z.object({ error: z.string() }),
            }
        }
    }, async (request, reply) => {
        try { 
            const {email, senha} = request.body;
            
            // Chama serviço de autenticação
            const {acessToken, refreshToken} = await handleLogin(
                {email, senha}, 
                server.jwt
            )

            // IMPORTANTE: Refresh token vai no cookie (httpOnly)
            // Não pode ser acessado por JavaScript (segurança)
            reply.setCookie("refreshToken", refreshToken, {
                httpOnly: true,    // Só servidor acessa
                secure: true,      // Só HTTPS
                sameSite: true,    // Proteção CSRF
                path: "/",
                maxAge: 60 * 60 * 24 * 7  // 7 dias
            })

            // Access token vai no body (cliente guarda)
            return reply.status(201).send({acessToken})
        } catch (error) {
            return reply.status(500).send({error: "Erro interno"})
        }
    })
}
```

**Service de autenticação:**
```typescript
// src/services/authServices.ts
export class AuthService {
    constructor(private jwt: any) {}

    async login(email: string, senha: string) {
        // 1. Busca usuário
        const user = await prisma.clientes.findUnique({ 
            where: { email } 
        })
        
        if(!user) throw new Error("Usuário não encontrado")

        // 2. Compara senha
        const valid = await bcrypt.compare(senha, user.senha)
        if(!valid) throw new Error("Senha incorreta")

        // 3. Gera tokens
        const acessToken = this.jwt.sign({ 
            sub: user.id,
            email: user.email 
        }, { expiresIn: '2h' })

        const refreshToken = this.jwt.sign({ 
            sub: user.id 
        }, { expiresIn: '7d' })

        return { acessToken, refreshToken }
    }
}
```

**Diferença Access vs Refresh Token:**
- **Access Token:** Curta duração (2h), vai em todas requisições
- **Refresh Token:** Longa duração (7d), serve só pra gerar novo access

---

### 4.4 Protegendo Rotas
**Arquivo:** `src/middleware/authenticator.ts`

```typescript
export async function Authenticate(
    request: FastifyRequest, 
    reply: FastifyReply
){
    // 1. Pega header Authorization
    const authentication = request.headers.authorization;
    // Formato: "Bearer eyJhbGciOiJIUzI1N..."

    if(!authentication){
        return reply.status(401).send({error: "Token ausente"});
    }

    // 2. Extrai o token (remove "Bearer ")
    const token = authentication.split(" ")[1];
    
    try{
        // 3. Verifica e decodifica
        const decoded = jwt.verify(token, env.SECRET_KEY);
        // decoded = { sub: "user-id", email: "user@email.com" }
        
        // 4. Adiciona usuário na request
        (request as any).user = decoded;
        // Agora outras funções podem acessar request.user
        
    } catch(error){
        return reply.status(500).send({error: "Token inválido"});
    }
}
```

**Uso em rotas:**
```typescript
server.post("/schedule", {
    preHandler: Authenticate,  // ← Executa ANTES da rota
    // ...
}, async (request, reply) => {
    const userId = request.user.sub;  // ← ID do usuário autenticado
    // ...
})
```

---

## 📅 5. SISTEMA DE AGENDAMENTOS

### 5.1 Modelo de Dados (Relacionamentos)

```prisma
// DIAGRAMA DE RELACIONAMENTOS:
//
// Clientes ──1:N──→ Agendamentos ←──N:1── Cabeleleiros
//                        ↓ N:1
//                  Dias_has_Horarios
//                   ↙          ↘
//              Dias (1:N)    Horarios (1:N)

model Dias_has_Horarios {
   id            String @id @default(uuid())
   dayId         String
   day           Dias @relation(fields: [dayId], references: [id])
   horarioId     String
   horario       Horarios @relation(fields: [horarioId], references: [id])
   
   // Cada combinação Dia+Horário é única
   // "15/01/2026 - 10:00" = 1 registro
}
```

**Por que essa estrutura?**
- Separar Dias e Horários permite reutilização
- Tabela de junção permite N:N com dados extras

---

### 5.2 Criação Automática de Calendário
**Arquivo:** `src/functions/days/postDays.ts`

```typescript
export async function PostDays(){
    const date = new Date();
    const day = dayjs(date);
      
    // LOOP: Próximos 7 dias
    for(let i = 0; i < 7; i++){
        const newDate = dayjs(day).add(i, 'day').startOf('day').toDate();
        // startOf('day') → 00:00:00 (zera horas)
       
        // VERIFICAÇÃO: É domingo ou feriado?
        const checkDay = verifySundayHoliday(newDate);
        if(checkDay) { continue }  // Pula

        // Já existe esse dia no banco?
        const resultado = await prisma.dias.findUnique({
            where: { day: newDate }
        })

        if(!resultado){
            // 1. Cria o dia
            const createdDay = await prisma.dias.create({
                data: { day: newDate }
            })

            // 2. Cria horários (9h às 17h)
            for(let j = 0; j < 8; j++){
                const horario = `${9 + j}:00`;  // 9:00, 10:00, ..., 16:00
                
                const createdHorario = await prisma.horarios.create({
                    data: {
                        horario: horario,
                        livre: true  // Começa disponível
                    }
                })

                // 3. Relaciona Dia + Horário
                const diaHorario = await prisma.dias_has_Horarios.create({
                    data: {
                        dayId: createdDay.id,
                        horarioId: createdHorario.id
                    }
                })

                // 4. Marca disponibilidade para CADA cabeleireiro
                const cabeleleiros = await prisma.cabeleleiros.findMany();
                for(const cabeleleiro of cabeleleiros) {
                    await prisma.cabeleleiro_has_Disponibilidade.create({
                        data: {
                            cabeleleiroId: cabeleleiro.id,
                            diasHorariosId: diaHorario.id
                        }
                    })
                }
            }
        }
    }
}
```

**Quando executa?**
```typescript
// src/server.ts
server.addHook("onReady", async () => {
    console.time("Carregando calendario");
    await PostDays();  // ← Executa ao iniciar servidor
    console.timeEnd("Carregando calendario");
})
```

**Por que verificar feriados?**
```typescript
// src/functions/days/verifySundayHoliday.ts
import Holidays from 'date-holidays';

export function verifySundayHoliday(data: Date): boolean {
    const hd = new Holidays('BR');  // Feriados do Brasil
    
    // É feriado?
    const isFeriado = hd.isHoliday(data);
    
    // É domingo? (0 = domingo)
    const isDomingo = data.getDay() === 0;
    
    return isFeriado || isDomingo;
}
```

---

### 5.3 Fluxo de Agendamento (COMPLETO)

#### PASSO 1: Cliente escolhe horário
**Endpoint:** `POST /schedule`

```typescript
// src/routes/schedules/postSchedules.ts
export function PostSchedules(server: FastifyTypedInstance){
    server.post("/schedule",{
        preHandler: Authenticate,  // Precisa estar logado
        schema: {
            body: z.object({
                destinary_name: z.string(),        // Nome do cliente
                destinary_email: z.string().email(),
                dayHorarioId: z.string().uuid(),   // ID do Dia+Horário
                cabeleleiroId: z.string(),
                tipoServicoId: z.string(),         // Corte, barba, etc
            }),
        }
    }, async (request, reply)=> {
        try {
            const sub = request.user.sub;  // ID do usuário logado
            const {
                destinary_name, 
                destinary_email, 
                dayHorarioId, 
                tipoServicoId, 
                cabeleleiroId
            } = request.body;

            // 1. Cria relação Serviço+Cabeleireiro
            const servico = await handleCreateService({
                tipoServicoId, 
                cabeleleiroId
            })
            
            // 2. Busca informações do horário
            const hourDayID = await filterHourDay(dayHorarioId);
            const hour = await filterHour(hourDayID.horarioId);
            const day = await filterDay(hourDayID.dayId);

            // 3. Formata data
            const date = dayjs(day.day).format("DD/MM");
            
            // 4. VALIDAÇÃO: Tem 6h de antecedência?
            const scheduleChecked = verifyDayHour(date, hour.horario)
            if(!scheduleChecked) {
                return reply.status(401).send({
                    message: "Precisa 6h de antecedência"
                })
            }

            // 5. Gera link de confirmação
            const confirmatedLink = 
                `http://localhost:3333/schedules/confirmation/` +
                `${hourDayID.id}/${sub}/${servico.id}`;
            
            // 6. Envia e-mail
            const message = await handleCreateMail({
                confirmatedLink, 
                destinary_email, 
                destinary_name, 
                date, 
                dayHorarioId
            })
           
            return reply.status(201).send({
                message: `Email enviado para ${destinary_email}`,
                email: nodemailer.getTestMessageUrl(message)
                // ↑ URL do Ethereal (e-mail fake para testes)
            });
        } catch (error) {
            return reply.status(500).send({error: "Erro interno"});
        }   
    })
}
```

**Por que não salva direto no banco?**
- Evita "agendamentos fantasma" (cliente desiste)
- Confirma que o email é válido
- Cliente tem tempo de revisar

---

#### PASSO 2: Cliente clica no link do e-mail
**Endpoint:** `GET /schedules/confirmation/:diaHorarioId/:userId/:servicoId`

```typescript
// src/routes/schedules/get-confirmation-link.ts
export function ConfirmationLink(server: FastifyTypedInstance){
    server.get("/schedules/confirmation/:diaHorarioId/:userId/:servicoId", {
        schema: {
            params: z.object({
                diaHorarioId: z.string().uuid(),
                userId: z.string().uuid(),
                servicoId: z.string().uuid()
            }),
        }
    }, async (request, reply) => {
        try {
            const {diaHorarioId, userId, servicoId} = request.params
            
            // SALVA NO BANCO (finalmente!)
            const agendamento = await handleCreateSchedule({
                diaHorarioId, 
                userId, 
                servicoId
            })
            
            return reply.status(200).send({id: agendamento.id})
        } catch (error) {
            return reply.status(500).send({error: "Erro interno"});
        }
    })
}
```

**Função que salva:**
```typescript
// src/functions/users/handleCreateSchedule.ts
export async function handleCreateSchedule({
    diaHorarioId, 
    userId, 
    servicoId
}){
    // 1. Valida que serviço existe
    const servico = await prisma.servicos.findUnique({
        where: {id: servicoId}
    })
    if (!servico) {
        throw new Error("Serviço não encontrado")
    }

    // 2. Busca informações do Dia+Horário
    const {dayId, horarioId} = await filterHourDay(diaHorarioId)

    // 3. MARCA HORÁRIO COMO OCUPADO
    await prisma.horarios.update({ 
        where: {id: horarioId},
        data: {livre: false}  // ← IMPORTANTE!
    })
    
    // 4. Cria agendamento
    return await prisma.agendamentos.create({
        data: {         
            servicosId: servicoId, 
            clientId: userId,      
            cabeleleiroId: servico.cabeleleiroId,
            diasHorariosId: diaHorarioId,
            confirmado: true  // Já confirmado (veio do email)
        }
    })
}
```

---

### 5.4 Validações de Regra de Negócio

#### Validação 1: Antecedência mínima (6h)
```typescript
// src/functions/days/verifyDayHour.ts
export function verifyDayHour(date: string, hour: string): boolean {
    const now = dayjs();
    
    // Monta datetime completo
    const [dia, mes] = date.split('/');
    const ano = now.year();
    const [hora] = hour.split(':');
    
    const agendamento = dayjs()
        .year(ano)
        .month(parseInt(mes) - 1)  // Mês começa em 0
        .date(parseInt(dia))
        .hour(parseInt(hora))
        .minute(0)
        .second(0);
    
    // Diferença em horas
    const diff = agendamento.diff(now, 'hour');
    
    return diff >= 6;  // Precisa de 6h de antecedência
}
```

#### Validação 2: Máximo 1 semana
```typescript
// src/functions/days/verifyDay.ts
export function verifyDay(day: string): boolean {
    const today = dayjs();
    const selected = dayjs(day);
    
    const diff = selected.diff(today, 'day');
    
    return diff >= 0 && diff <= 7;
    // ✅ Entre hoje e 7 dias
}
```

---

## 🔍 6. CONSULTAS E FILTROS

### Listar horários disponíveis por dia
```typescript
// GET /schedules/day/:day
export function GetSchedulesHourByDay(server: FastifyTypedInstance){
    server.get("/schedules/day/:day", {
        schema: {
            params: z.object({
                day: z.string()  // "2026-02-25"
            }),
        }
    }, async (request, reply) => {
        try {
            const {day} = request.params;
            
            // Filtra agendamentos daquele dia
            const schedules = await filterSchedulesByDay(day)
            
            return reply.status(200).send(schedules)
        } catch (error) {
            return reply.status(500).send({error: "Erro"});
        }
    })
}
```

```typescript
// src/functions/filters/filterSchedulesByDay.ts
export async function filterSchedulesByDay(day: string) {
    const parsedDay = new Date(day);
    
    // Busca o dia
    const dayFound = await prisma.dias.findUnique({
        where: { day: parsedDay }
    })
    
    if(!dayFound) throw new Error("Dia não encontrado")
    
    // Busca horários daquele dia
    const diasHorarios = await prisma.dias_has_Horarios.findMany({
        where: { dayId: dayFound.id },
        include: {
            horario: true,  // Traz dados do horário junto
            day: true
        }
    })
    
    // Filtra apenas horários LIVRES
    const horariosLivres = diasHorarios.filter(dh => 
        dh.horario.livre === true
    )
    
    return horariosLivres;
}
```

---

## ⚙️ 7. CONFIGURAÇÃO E AMBIENTE

### Validação de variáveis de ambiente
```typescript
// src/env.ts
import {z} from "zod";

const envSchema = z.object({
    DATABASE_URL: z.string().url(),  // Valida URL
    SECRET_KEY: z.string()           // Valida existe
})

export const env = envSchema.parse(process.env);
// ❌ Se falta variável → CRASH no startup
// ✅ Se tudo OK → env.SECRET_KEY está disponível
```

**Arquivo .env:**
```env
DATABASE_URL="file:./dev.db"
SECRET_KEY="minha-chave-super-secreta"
```

**Por que validar?**
- Falha rápido (no startup, não em produção)
- Type-safety (TypeScript sabe que env.SECRET_KEY existe)

---

### Documentação automática (Swagger)
```typescript
// src/server.ts
server.register(fastifySwagger, {
    openapi: {
        info: {
            title: "scheduleMenager",
            version: "1.0.0",
        },
    }, 
    transform: jsonSchemaTransform,  // Zod → OpenAPI
})

server.register(fastifySwaggerUi, {
    routePrefix: "/docs",  // http://localhost:3333/docs
})
```

**Por que Swagger?**
- Gera documentação automática dos endpoints
- Interface para testar APIs (sem Postman)
- Usa os schemas Zod que você já definiu

---

## 🎭 8. TESTES

### Estrutura de testes
```typescript
// src/functions/days/verifyDay.test.ts
import {expect, it, describe} from "vitest"
import { verifyDay } from "./verifyDay"
import dayjs from "dayjs"

describe("Verifica se a data é valida", () => {
    it("Deve retornar true para dia futuro", () => {
        const day = dayjs().add(1, 'day').toString()
        expect(verifyDay(day)).toBe(true)
    })
    
    it("Deve retornar false para dia passado", () => {
        const day = dayjs().add(-1, 'day').toString()
        expect(verifyDay(day)).toBe(false)
    })
})
```

**Rodar testes:**
```bash
npm test              # Roda todos
npm test verifyDay    # Roda específico
```

---

## 🚀 9. EXECUÇÃO E DEPLOY

### Desenvolvimento
```bash
npm run dev
# Usa tsx watch (reinicia automático)
# Lê .env automaticamente
```

### Build para produção
```bash
npm run build
# Usa tsup (compila TypeScript → JavaScript)
# Gera pasta dist/

npm start
# Executa dist/server.js (compilado)
```

### Docker
```dockerfile
FROM node:18-alpine

WORKDIR /app

# Instala dependências
COPY package*.json ./
RUN npm i

# Copia código
COPY . .

# Gera Prisma Client
RUN npx prisma generate

# Roda testes
RUN npm run test

# Compila
RUN npm run build

EXPOSE 3333

CMD ["npm", "start"]
```

**Rodar:**
```bash
docker build -t stylemanager .
docker run -p 3333:3333 stylemanager
```

---

## 🔄 10. FLUXO COMPLETO (PONTA A PONTA)

### Cenário: Cliente quer corte de cabelo

```
1. CADASTRO
   POST /cadastrar
   { name, email, senha }
   → Senha hasheada com bcrypt
   → Usuario salvo no banco

2. LOGIN
   POST /login  
   { email, senha }
   → Compara senha hasheada
   → Gera access + refresh tokens
   → Retorna tokens

3. VER HORÁRIOS DISPONÍVEIS
   GET /schedules/day/2026-02-25
   Header: Authorization: Bearer <token>
   → Retorna horários livres daquele dia

4. FAZER AGENDAMENTO
   POST /schedule
   Header: Authorization: Bearer <token>
   {
     destinary_name: "João",
     destinary_email: "joao@email.com",
     dayHorarioId: "uuid-do-horario",
     cabeleleiroId: "uuid-do-cabeleireiro",
     tipoServicoId: "uuid-do-servico"
   }
   → Valida 6h de antecedência
   → Envia email com link

5. CLIENTE CLICA NO EMAIL
   GET /schedules/confirmation/:diaHorarioId/:userId/:servicoId
   → Marca horário como ocupado
   → Cria agendamento no banco
   → Retorna confirmação

6. CABELEIREIRO VÊ AGENDAMENTOS
   GET /schedules
   → Lista todos agendamentos confirmados
```

---

## 🛡️ 11. SEGURANÇA

### Checklist implementado:
- ✅ Senhas hasheadas (bcrypt)
- ✅ JWT com expiração
- ✅ Refresh token em httpOnly cookie
- ✅ Validação de inputs (Zod)
- ✅ Rotas protegidas com autenticação
- ✅ Variáveis de ambiente validadas

### O que poderia melhorar:
- ⚠️ Rate limiting (prevenir spam)
- ⚠️ HTTPS obrigatório
- ⚠️ CORS restrito (agora aceita qualquer origem)
- ⚠️ Sanitização de HTML nos emails
- ⚠️ Logs de auditoria

---

## 📊 12. DECISÕES DE DESIGN

### Por que SQLite?
**Escolha:** Simplicidade para desenvolvimento  
**Trade-off:** Não escala para produção  
**Próximo passo:** Migrar para PostgreSQL

### Por que não usar ORM tradicional?
**Escolha:** Prisma (não é ORM tradicional, é "Next-gen ORM")  
**Vantagem:** Type-safety automático  
**Desvantagem:** Menos controle sobre SQL

### Por que validação por e-mail?
**Escolha:** Confirmação obrigatória antes de salvar  
**Vantagem:** Evita agendamentos falsos  
**Desvantagem:** Depende de email funcionar

### Por que não deletar agendamentos?
**Observação:** Não há endpoint DELETE  
**Razão provável:** Histórico é importante  
**Sugestão:** Implementar soft delete (campo `cancelado`)

---

## 🎓 13. CONCEITOS APLICADOS

### Design Patterns:
- **Repository Pattern:** Functions abstraem acesso ao banco
- **Service Layer:** AuthService orquestra lógica complexa
- **Middleware Pattern:** Authenticate intercepta requests
- **Plugin Architecture:** Fastify plugins modulares

### Princípios SOLID:
- **Single Responsibility:** Cada function faz uma coisa
- **Dependency Injection:** Server passa para AuthService

### Boas Práticas:
- Separação de concerns (routes vs functions vs services)
- Validação em múltiplas camadas
- Type-safety em todo codebase
- Testes unitários

---

## 🚧 14. LIMITAÇÕES ATUAIS

### Problemas identificados:

1. **Race Condition em horários:**
   ```typescript
   // Dois clientes escolhem mesmo horário simultaneamente
   // Ambos veem livre=true
   // Ambos recebem email
   // Segundo a confirmar perde
   ```
   **Solução:** Transaction ou lock otimista

2. **Inconsistência de nomenclatura:**
   ```typescript
   // Mistura português e inglês
   handlerCreateUser  // inglês
   cabeleleiros       // português
   ```

3. **Email não configurado:**
   ```typescript
   // Usa Ethereal (fake email)
   // Em produção precisa SMTP real
   ```

4. **Sem paginação:**
   ```typescript
   // GET /schedules retorna TODOS
   // Com 1000 agendamentos = problema
   ```

5. **Tipagem `any`:**
   ```typescript
   (request as any).user = decoded
   // Perde type-safety
   ```
   **Solução:** Fastify decorators ou augmentation

---

## 🎯 15. PRÓXIMOS PASSOS RECOMENDADOS

### Prioridade ALTA:
1. **Corrigir race condition** (transactions)
2. **Migrar para PostgreSQL**
3. **Adicionar paginação**
4. **Implementar logging estruturado** (Pino)
5. **Configurar CORS corretamente**

### Prioridade MÉDIA:
6. **Adicionar testes E2E**
7. **Implementar soft delete**
8. **Cache com Redis** (horários disponíveis)
9. **Rate limiting**
10. **Webhook de notificações**

### Prioridade BAIXA:
11. **Dashboard admin**
12. **Sistema de avaliações**
13. **Integração WhatsApp**
14. **Microserviços**

---

## 📚 GLOSSÁRIO

- **JWT:** JSON Web Token - token de autenticação
- **Bcrypt:** Algoritmo de hash de senha
- **Prisma:** ORM moderno para TypeScript
- **Zod:** Biblioteca de validação de schemas
- **Fastify:** Framework web performático
- **Day.js:** Biblioteca de manipulação de datas
- **Middleware:** Função que executa antes das rotas
- **Plugin:** Módulo reutilizável no Fastify
- **Schema:** Definição de estrutura de dados
- **Migration:** Script que altera estrutura do banco
- **Seed:** Script que popula banco com dados iniciais

---

**Fim da documentação** 🎉

Qualquer dúvida sobre alguma parte específica, é só perguntar!
