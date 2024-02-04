
# ParkingApi

## Descrição

Uma breve descrição do propósito e escopo do projeto.

## Tecnologias Utilizadas

-   React
-   Tailwind
-   Shadcn UI
-   Radix UI
-   Axios
-   NestJS
-   TypeORM
-   MySQL
-   Typescript
-   Swagger
-   GCP

## Requisitos do Sistema

O projeto foi construído utilizando o NodeJs na versão 20. Por esse motivo é recomendado utilizar a versão LTS para melhor compatibilidade.

Para o backend foi utilizado o npm para instalação de pacotes e desenvolvimento, enquanto que para o frontend foi utilizado o pnpm para tal.

## Instalação Backend

### Clonar o Repositório

`git clone https://github.com/KelvinSilvaDev/desafio-entrevista-nodejs.git
cd desafio-entrevista-nodejs` 

### Instalar Dependências do projeto

`npm install` 

## Instalação Frontend

### Clonar o Repositório

`git clone https://github.com/KelvinSilvaDev/dr-consulta-frontend-challenge-parking-api.git
cd dr-consulta-frontend-challenge-parking-api` 

### Instalar Dependências do projeto

`pnpm install` ou `npm install` 

## Configuração

### Configuração do Backend

-   O projeto utiliza variáveis de ambiente definidas no arquivo .env para se conectar com o banco de dados e gerenciar o secret do jwt.
-   As configurações do banco de dados, como host, usuário, senha e etc devem ser devidamente configuradas conforme o exemplo abaixo.

````
JWT_SECRET=eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSJ9.nLQi-i-p8XX72uNiDTwXjg_NCyMy8fRuY8sQG7npR9Q

WEBTOKEN_ENCRYPTION_KEY=afdasSFAfad

APP_ENV=development

DB_TYPE=mysql

DB_USERNAME=root

DB_HOST=localhost

DB_PORT=3306

DB_DATABASE=nest
````

### Configuração do Frontend

-   Configuração de variáveis de ambiente, conforme o exemplo.
````
VITE_API_URL=http://localhost:8080/api/v1
````

## Uso

### Iniciar o Backend

`npm start:dev` para habilitar o watch mode.
`npm run build` e depois `npm run start:prod` para executar uma build de produção.

### Iniciar o Frontend

`npm run dev` 

## Estrutura do Projeto

### Backend (NestJS)

O projeto do backend utiliza as convenções recomendadas pelas documentações do Nestjs(https://docs.nestjs.com/) e TypeORM(https://typeorm.io/). 

O arquivo responsável por iniciar a api é o main.ts, que importa o Swagger e o módulo App.

O main.ts também configura as tags do Swagger e define a rota base da api na variável globalPrefix.

Dessa forma a documentação do Swagger fica em localhost:8080/api/v1/docs
Enquanto que todas as outras rotas partem de localhost:8080/api/v1/

O módulo App por sua vez, importa e trata todos os demais módulos e realiza a conexão com o banco de dados.

O projeto conta com as seguintes rotas e suas respectivas descrições:

#### Rotas de Autenticação

`/api/v1/auth/login` POST
Realiza o login na aplicação e retorna um token de acesso. Essa rota espera o seguinte corpo na reqiusição:

```json
{
  "username": "test",
  "password": "12345678"
}
```

Reposta em caso de sucesso:
```json
{ 
"expiration": 3600,
"expirationFormatted": "31 de janeiro de 2024 às 10:06",
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJ0ZXN0IiwibmFtZSI6InN0cmluZyIsImVtYWlsIjoidGVzdGVAbWFpbC5jb20iLCJpYXQiOjE3MDY3MDI3ODQsImV4cCI6MTcwNjcwNjM4NH0.ZlLzBDPFbYg4ewqSkErrrKNlJipP0WYaebxt8lIwRNI" 
}
```
`/api/v1/auth/register` POST
Realiza o cadastro do usuário na aplicação, caso o usuário envie dados válidos ele também é automaticamente autenticado e recebe um token de acesso. Essa rota espera o seguinte corpo na requisição:

```json
{
  "email": "teste@mail.com",
  "username": "test",
  "name": "string",
  "password": "12345678"
}
```
#### Rotas de Estabelecimentos

`/api/v1/establishment`  POST, GET
Realiza a gestão dos estabelecimentos, como cadastro e listagem.

POST:
```json
{
  "name": "John Doe's Parking Lot",
  "cnpj": "12345678901234",
  "address": "Street John Doe, 123",
  "phone": "12345678901",
  "motorcycleSpaces": 10,
  "carSpaces": 10,
}
```

`/api/v1/establishment/{id}` GET
Realiza a exibição de um determinado estabelecimento filtrado pelo ID.

Exemplo de resposta:
```json
{
   "status":true,
   "data":{
      "id":"1567e173-b8c8-4427-b6ea-aec5ed2ab027",
      "name":"Estacionamento Vila Alpina",
      "cnpj":"12345678901234",
      "address":"R Costa Barros, 123",
      "phone":"12345678901",
      "motorcycleSpaces":20,
      "carSpaces":30,
      "createdAt":"2024-01-28T07:58:33.447Z",
      "updatedAt":"2024-01-28T07:58:33.447Z",
      "occupiedCarSpaces":0,
      "occupiedMotorcycleSpaces":0
   }
}
```

`/api/v1/establishment/{id}` PUT
Edita/Atualiza um determinado estabelecimento filtrado pelo ID

Exemplo de corpo:
```json
{
  "motorcycleSpaces": 10
}
```
Reposta:
```json
{
  "status": true,
  "message": "Estabelecimento atualizado com sucesso!"
}
```

`/api/v1/establishment/{id}` DELETE
Exclui um determinado estabelecimento filtrado pelo ID

Resposta:

```json
{
  "status": true,
  "message": "Estabelecimento removido com sucesso!"
}
```

#### Rotas de Veículos

`/api/v1/vehicles` POST e GET
Cadastra e obtém uma listagem dos veículos cadastrados.

Exemplo de corpo para cadastro:

```json
{
  "brand": "Fiat",
  "model": "Palio",
  "color": "Branco",
  "licensePlate": "AFC3384",
  "type": "Car",
  "cnh": "123486789"
}
```
Resposta:
```json
{
  "status": true,
  "message": "Veículo cadastrado com sucesso!",
  "data": {
    "brand": "Fiat",
    "model": "Palio",
    "color": "Branco",
    "licensePlate": "AFC3384",
    "type": "Car",
    "cnh": "123486789",
    "id": "0ac75995-986a-47f1-b680-07db978fdd29",
    "createdAt": "2024-01-31T12:24:58.496Z",
    "updatedAt": "2024-01-31T12:24:58.496Z"
  }
}
```

`api/v1/vehicles/{id}` PUT
Edita/Atualiza um determinado veículo filtrado pelo ID.

Corpo:
```json
{
  "cnh": "54688755156"
}
```

Resposta:
```json
{
  "status": true,
  "message": "Veículo atualizado com sucesso!"
}
```

`/api/v1/vehicles/{id}` DELETE
Realiza a exclusão de um determinado veículo.

Reposta:
```json
{
  "status": true,
  "message": "Veículo excluído com sucesso!"
}
```

#### Rotas de Registro de Entrada e Saída
`/api/v1/parking-records` POST

Realiza um registro de entrada:

Corpo:
```json
{
  "vehicle": {
    "id": "faf199c5-a611-42b8-90a1-549a39ba40b0"
  },
  "establishment": {
    "id": "1567e173-b8c8-4427-b6ea-aec5ed2ab027"
  }
}
```

Reposta:
```json
{
  "status": true,
  "message": "Entrada registrada com sucesso!",
  "data": {
    "vehicle": {
      "id": "faf199c5-a611-42b8-90a1-549a39ba40b0"
    },
    "establishment": {
      "id": "1567e173-b8c8-4427-b6ea-aec5ed2ab027"
    },
    "entryTime": "2024-01-31T12:33:18.323Z",
    "exitTime": null,
    "id": 8
  }
}
```

Essa ação incrementa +1 no valor de occupiedCarSpaces ou occupiedMotorcycleSpaces do estabelecimento com base no tipo de veículo que está sendo registrada a entrada.

`/api/v1/parking-records/{id}` PUT

Registra a saída do carro do estabelecimento.

Resposta:
```json
{
  "status": true,
  "message": "Saída registrada com sucesso!",
  "data": {
    "id": 8,
    "entryTime": "2024-01-31T12:33:18.000Z",
    "exitTime": "2024-01-31T12:43:33.803Z",
    "vehicle": {
      "id": "faf199c5-a611-42b8-90a1-549a39ba40b0",
      "brand": "Fiat",
      "model": "Uno",
      "color": "Prata",
      "licensePlate": "DEF-5678",
      "type": "car",
      "cnh": "12345678910",
      "createdAt": "2024-01-20T21:58:33.699Z",
      "updatedAt": "2024-01-20T21:58:33.699Z"
    },
    "establishment": {
      "id": "1567e173-b8c8-4427-b6ea-aec5ed2ab027",
      "name": "Estacionamento Vila Alpina",
      "cnpj": "12345678901234",
      "address": "R Costa Barros, 123",
      "phone": "12345678901",
      "motorcycleSpaces": 15,
      "carSpaces": 30,
      "createdAt": "2024-01-28T07:58:33.447Z",
      "updatedAt": "2024-01-31T12:33:18.000Z",
      "occupiedCarSpaces": 0,
      "occupiedMotorcycleSpaces": 1
    }
  }
}
```

#### Relatórios por Estabelecimento
`/api/v1/report/establishment/{id}` GET

Obtém uma listagem do relatório de entrada e saída geral de um determinado estabelecimento filtrado pelo ID.

Exemplo da resposta:
```json
{
  "status": true,
  "data": {
    "totalCarEntries": [
      {
        "id": 8,
        "entryTime": "2024-01-31T12:33:18.000Z",
        "exitTime": "2024-01-31T12:43:34.000Z"
      }
    ],
    "totalMotorcycleEntries": 0
  }
}
```

#### Sumário
`/api/v1/summary/{establishmentId}` GET

Obtém um sumário de dados relevantes gerais de entradas e saídas de um determinado estabelecimento, filtrado pelo ID.

Resposta:
```json
{
  "entryExitSummary": {
    "totalEntries": 1,
    "totalExits": 1,
    "totalMotorcycles": 0,
    "totalCars": 1,
    "totalCarEntries": 1,
    "totalCarExits": 1,
    "totalMotorcycleEntries": 0,
    "totalMotorcycleExits": 0
  }
}
```

`/api/v1/summary/period/{establishmentId}` POST
Obtém o mesmo tipo de sumário porém filtrado com uma data inical e final de acordo com o seguinte exemplo de requisição:

```json
{
  "startDate": "2024-07-01",
  "endDate": "2024-31-01"
}
```

Resposta:

```json
{
  "entryExitSummary": {
    "result": [
      {
        "id": 8,
        "entryTime": "2024-01-31T12:33:18.000Z",
        "exitTime": "2024-01-31T12:43:34.000Z"
      }
    ],
    "totalEntries": 0,
    "totalExits": 0
  }
}
```

Essa ação também realiza um decremento na propriedade occupiedCarSpaces ou occupiedMotorcycleSpaces dependendo do tipo de veículo que está sendo registrada a saída.

### Frontend (React)

O frontend trata-se de uma dashboard que realiza a conexão com a api e obtém as informações sobre estabelecimentos cadastrados, veículos, registros de entrada e saída, sumários e relatórios todos filtrados por ID do estabelecimento.

## Problemas Conhecidos

O projeto encontra-se inacabado na parte do frontend e conta somente com a tela de estabelecimentos. A idéia seria seguir a mesma estrutura para as demais páginas e refinar a lógica e experiência do usuário com cada elemento da página.

## Contato

📱Tel/Whatsapp: 11 9 5837-8212.
✉️ E-mail: kelvinsilvadev@gmail.com
🧳 Linkedin: https://www.linkedin.com/in/kelvin-oliveira-romao/

## Agradecimentos

Agradeço imensamente ao time de R&S da Shark It e principalmente ao João Pedro Carvalho pela rica oportunidade e confiança com essa entrega. Agradeço também ao time da DrConsulta e espeero que esse projeto seja o suficiente para demonstrar meu compromentimento e dedicação, tal como minhas habilidades e valores a agregar ao time de tecnologia.