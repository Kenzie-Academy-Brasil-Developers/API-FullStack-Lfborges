## **Endpoints**

A API tem um total de 9 endpoints, sendo em volta principalmente do usuário (dev) - podendo cadastrar seu perfil, contatos e suas informacoes. <br/>

Podemos acessar um usuário específico e ler todos seus contatos pelo token:

Caso dê tudo certo, a resposta será assim:

<h2 align ='center'> Listando usuários com token</h2>

`GET /users - FORMATO DA RESPOSTA - STATUS 200`

```json
  	{
		"id": 2,
		"full_name": "Felipe Almeida",
		"email": "felipe@teste.com",
		"phone_number": "11977478334",
		"registration_date": "2023-12-26",
		"delete_date": null,
		"contacts": []
	},
	{
		"id": 3,
		"full_name": "Luis ",
		"email": "luis2@kenzie.com",
		"phone_number": "11977478336",
		"registration_date": "2023-12-26",
		"delete_date": null,
		"contacts": []
	},
	{
		"id": 4,
		"full_name": "Wilson Borges",
		"email": "wbborges@yahoo.com",
		"phone_number": "11977478337",
		"registration_date": "2023-12-26",
		"delete_date": null,
		"contacts": []
	},
	{
		"id": 5,
		"full_name": "Wilson vas",
		"email": "wbborges1@yahoo.com",
		"phone_number": "11977478336",
		"registration_date": "2023-12-26",
		"delete_date": null,
		"contacts": []
	},
	{
		"id": 1,
		"full_name": "Wilson Borges vas 2",
		"email": "luis1@kenzie.com",
		"phone_number": "11977478337",
		"registration_date": "2023-12-23",
		"delete_date": null,
		"contacts": []
	}
```

Podemos acessar um usuário específico utilizando o endpoint:

`GET /user/id - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
	"id": 2,
	"full_name": "Felipe Almeida",
	"email": "felipe@teste.com",
	"phone_number": "11977478334",
	"registration_date": "2023-12-26",
	"delete_date": null,
	"contacts": [
		{
			"id": 5,
			"full_name": "teste1",
			"email": "teste1@email.com",
			"phone_number": "11977478337",
			"registration_date": "2024-01-02",
			"delete_date": null
		},
		{
			"id": 6,
			"full_name": "Ander Verrone",
			"email": "anderson@gmail.com",
			"phone_number": "11977478335",
			"registration_date": "2024-01-02",
			"delete_date": null
		},
		{
			"id": 7,
			"full_name": "test ",
			"email": "teste@email.com",
			"phone_number": "11977478334",
			"registration_date": "2024-01-02",
			"delete_date": null
		},
		{
			"id": 8,
			"full_name": "andrian",
			"email": "andrian@email.com",
			"phone_number": "11977478339",
			"registration_date": "2024-01-02",
			"delete_date": null
		},
		{
			"id": 9,
			"full_name": "fabio",
			"email": "fabio@mail.com",
			"phone_number": "11877478337",
			"registration_date": "2024-01-03",
			"delete_date": null
		}
	]
}
]
```

<h2 align ='center'> Criação de usuário </h2>

`POST /users- FORMATO DA REQUISIÇÃO`

```json
{
	"full_name": "forrest gump",
	"email": "forres@yahoo.com",
	"password": "123456",
	"phone_number": "11477478336"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /users - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"id": 8,
	"full_name": "forrest gump",
	"email": "forres@yahoo.com",
	"phone_number": "11477478336",
	"registration_date": "2024-01-03",
	"delete_date": null,
	"contacts": []
}
```

`POST /sessions - FORMATO DA REQUISIÇÃO`

```json
{
  "email": "johndoe@email.com",
  "password": "123456"
}
```

Caso dê tudo certo, a resposta será assim:

`POST /login - FORMATO DA RESPOSTA - STATUS 201`

```json
  {
	"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjgsInJlZ2lzdHJhdGlvbkRhdGUiOiIyMDI0LTAxLTAzIiwiaWF0IjoxNzA0MzA5MzI1LCJleHAiOjE3MDY5MDEzMjV9.TpFvP-bLvkYEL3TWKD2IlssX46OfBElvmZRxdnaxPdc",
	"userId": 8
}
```

Podemos acessar um usuário específico e aletrar suas informacoes utilizando o endpoint:

`PATCH /user/id - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
	"full_name":"Wilson Borges vas 2",
	"email": "luis1@kenzie.com",
	"phone_number": "11977478337"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /user/id - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
	"id": 1,
	"full_name": "Wilson Borges vas 2",
	"email": "luis1@kenzie.com",
	"phone_number": "11977478337",
	"registration_date": "2023-12-23",
	"delete_date": null,
	"contacts": []
}
```
Com essa resposta, vemos que temos duas informações, o user e o token respectivo, dessa forma você pode guardar o token e o usuário logado no localStorage para fazer a gestão do usuário no seu frontend.

## Rotas que necessitam de autorização

Rotas que necessitam de autorização deve ser informado no cabeçalho da requisição o campo "Authorization", dessa forma:

> Authorization: Bearer {token}
> 
> <blockquote>Na requisição apenas é necessário o TOKEN, a aplicação ficará responsável em buscar o id do usuário no token e retorna ele.</blockquote>

<br>

`POST /user/id/contact/ - FORMATO DA RESPOSTA - STATUS 201`

```json
{
	"full_name":"joaquim santas",
	"email":"joaquimSantas@teste.com",
	"phone_number":"11977478333"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /user/id - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
	"id": 1,
	"full_name": "Wilson Borges vas 2",
	"email": "luis1@kenzie.com",
	"phone_number": "11977478337",
	"registration_date": "2023-12-23",
	"delete_date": null,
	"contacts": [
		{
			"id": 4,
			"full_name": "joaquim santas",
			"email": "joaquimSantas@teste.com",
			"phone_number": "11977478333",
			"registration_date": "2023-12-26",
			"delete_date": null
		}
	]
}
```

Podemos acessar um usuário específico e aletrar suas informacoes utilizando o endpoint:

`PATCH /contaacts/id - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
	"full_name": "teste2",
	"email": "teste2@email.com",
	"phone_number": "11977478337"
}
```

Caso dê tudo certo, a resposta será assim:

`PATCH /contact/id - FORMATO DA RESPOSTA - STATUS 200`

```json
  {
	"id": 11,
	"full_name": "teste2",
	"email": "teste2@email.com",
	"phone_number": "11977478337",
	"registration_date": "2024-01-03",
	"delete_date": null
}
```

Podemos acessar um usuário específico e ler todos seus contatos pelo token:

Caso dê tudo certo, a resposta será assim:

`PATCH /contacts- FORMATO DA RESPOSTA - STATUS 200`

```json
  	{
		"id": 6,
		"full_name": "Ander Verrone",
		"email": "anderson@gmail.com",
		"phone_number": "11977478335",
		"registration_date": "2024-01-02",
		"delete_date": null
	},
	{
		"id": 7,
		"full_name": "test ",
		"email": "teste@email.com",
		"phone_number": "11977478334",
		"registration_date": "2024-01-02",
		"delete_date": null
	},
	{
		"id": 8,
		"full_name": "andrian",
		"email": "andrian@email.com",
		"phone_number": "11977478339",
		"registration_date": "2024-01-02",
		"delete_date": null
	},
	{
		"id": 9,
		"full_name": "fabio",
		"email": "fabio@mail.com",
		"phone_number": "11877478337",
		"registration_date": "2024-01-03",
		"delete_date": null
	},
	{
		"id": 10,
		"full_name": "teste2",
		"email": "teste2@email.com",
		"phone_number": "11977478332",
		"registration_date": "2024-01-03",
		"delete_date": null
	},
	{
		"id": 11,
		"full_name": "teste2",
		"email": "teste2@email.com",
		"phone_number": "11977478337",
		"registration_date": "2024-01-03",
		"delete_date": null
	}
```

Também é possível deletar um trabalho do seu perfil, utilizando este endpoint:

`DELETE /contacts/id - FORMATO DA RESPOSTA - STATUS 204`

```
Não é necessário um corpo da requisição. apenas bearer token
```
