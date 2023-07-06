<h1 align="center">Parking Lot API</h1>
<p align="center">Uma API feita com NestJS para controle de estacionamentos.</p>

## Descrição

API construída em cima do framework [NestJS](https://github.com/nestjs/nest), com o objetivo de gerenciar estacionamentos para carros e motos.

## Tecnologias

- [Typescript](https://typescriptlang.org/)
- [NestJS](https://github.com/nestjs/nest)
- [TypeORM](https://typeorm.io/)
- [Swagger](https://swagger.io/)

## Instalação

```bash
$ yarn install | npm install
```

## Banco de dados

Crie um arquivo `.env` com os seguintes dados:

```bash
DB_HOST='your_db_host'
DB_PORT=your_db_port
DB_USERNAME='your_db_username'
DB_PASSWORD='your_db_password'
DB_DATABASE='your_db_database'
JWT_SECRET='your_jwt_secret'
```

## Rodando o app

Porta padrão: `3000`

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Testes

```bash
# unit tests
$ yarn test

# test coverage
$ yarn test:cov
```

## Principais rotas

<hr />

GET `/api`

Para ver a documentação de todos os endpoints, basta acessar a interface do Swagger.

<hr />

POST `/auth/login`

Simula um processo de login e, caso o valor da senha seja `"1234"`, retorna um `access_token`.

Body

```bash
{
  "password": "1234"
}
```

Response

```bash
{
	"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInVzZXJuYW1lIjoidXNlciAxIiwiaWF0IjoxNjg4NjU1NTYxLCJleHAiOjE2ODg3NDE5NjF9.WTyfBXBCjVycPv9UOKKWcT0gC1DwzGBpHnQ3Rz87L8M"
}
```

<hr />

POST `/enterprise`

Cadastra uma empresa (estacionamento).

Body

```bash
{
  "name": "Teste",
  "cnpj": "00000000000000",
  "phone": "99999999999",
  "address": "Rua Teste",
  "motorbikeParkingSpots": 10,
  "carParkingSpots": 5
}
```

Response

```bash
{
  "name": "Teste",
  "cnpj": "00000000000000",
  "phone": "99999999999",
  "address": "Rua Teste",
  "motorbikeParkingSpots": 10,
  "carParkingSpots": 5,
  "id": 1
}
```

<hr />

POST `/vehicle`

Cadastra um veículo.

Body

```bash
{
  "brand": "Marca teste",
  "model": "Modelo teste",
  "color": "Branco",
  "plate": "aaa1a11",
  "type": "car" // "car" | "motorbike"
}
```

Response

```bash
{
  "brand": "Marca teste",
  "model": "Modelo teste",
  "color": "Branco",
  "plate": "aaa1a11",
  "type": "car",
  "id": 1
}
```

<hr />

POST `/record/entry`

Cadastra a entrada de um veículo em um estacionamento.

Body

```bash
{
	"vehicle": 1,
	"enterprise": 1,
	"timestamp": "2023-08-02T10:00:05.000Z"
}
```

Response

```bash
{
	"vehicle": 1,
	"enterprise": 1,
	"entry_timestamp": "2023-08-02T10:00:05.000Z",
	"exit_timestamp": null,
	"id": 1
}
```

<hr />

POST `/record/exit`

Adiciona o horário de saída a um registro.

Body

```bash
{
	"timestamp": "2023-08-02T10:15:30.000Z",
	"id": 1
}
```

Response

```bash
{
	"affected": 1
}
```

<hr />

GET `/record/summary`

Retorna o resumo da quantidade de entradas e saídas totais de um estacionamento.

Body

```bash
{
	"enterpriseId": 1
}
```

Response

```bash
{
	"entries": 10,
	"exits": 5
}
```

<hr />

GET `/record/summary/hour`

Retorna o resumo da quantidade de entradas e saídas de um estacionamento agrupados por hora.

Body

```bash
{
	"enterpriseId": 1
}
```

Response

```bash
[
	{
		"hour": "2023-08-02T04:00:00.000Z",
		"entries": 4,
		"exits": 1
	},
	{
		"hour": "2023-08-02T05:00:00.000Z",
		"entries": 2,
		"exits": 5
	}
]
```

<hr />
