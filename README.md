_Bem vinda(o)!!_
# Project Blogs Api 📬
![ghipy](https://c.tenor.com/p8MpmLvLZxIAAAAM/usps-mail.gif)

<details>
           <summary>Links</summary>
           <a href="https://github.com/tchapi/markdown-cheatsheet">Usando operações assíncronas com o método Array.map ()</a> </br>
           <a href="https://www.ibm.com/docs/pt-br/developer-for-zos/14.0.0?topic=formats-datetime-as-string-data">DateTime como Dados STRING</a> </br>
           <a href="https://sequelize.org/master/manual/eager-loading.html">INNER JOIN com Sequelize</a> </br>
</details>


# Habilidades 

Nesse projeto, construí um back-end usando `ORM` com o pacote `sequelize` do `npm`, que é capaz de:
 - Criar e associar tabelas usando `models` do `sequelize`
 - Construir endpoints para consumir os models que criar 
 - Fazer um `CRUD` com o `ORM`

## Desafios
  - [1 - Endpoint POST `/user`](#1---Endpoint-post-user)
  - [2 - Endpoint POST `/login`](#2---Endpoint-post-login)
  - [3 - Endpoint GET `/user`](#3---Endpoint-get-user)
  - [4 - Endpoint GET `/user/:id`](#4---Endpoint-get-userid)
  - [5 - Endpoint POST `/categories`](#5---Endpoint-post-categories)
  - [6 - Endpoint GET `/categories`](#6---Endpoint-get-categories)
  - [7 - Endpoint POST `/post`](#7---Endpoint-post-post)
  - [8 - Endpoint GET `/post`](#8---Endpoint-get-post)
  - [9 - Endpoint GET `post/:id`](#9---Endpoint-get-postid)
  - [10 - Endpoint PUT `/post/:id`](#10---Endpoint-put-postid)
  - [Requisitos Bônus](#requisitos-bônus)
  - [11 - Endpoint DELETE `post/:id`](#11---Endpoint-delete-postid)
  - [12 - Endpoint DELETE `/user/me`](#12---Endpoint-delete-userme)
  - [13 - Endpoint GET `post/search?q=:searchTerm`](#13---Endpoint-get-postsearchqsearchterm)

## Mais detalhes
 ### 1 - Endpoint POST `/user`

#### Os seguintes pontos foram construidos:

- O endpoint foi capaz de adicionar um novo user a sua tabela no banco de dados;

- O corpo da requisição tem o seguinte formato:

  ```json
  {
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "password": "123456",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```
- O campo `displayName` é uma string com no mínimo de 8 caracteres;

- O campo `email` será considerado válido se tiver o formato `<prefixo>@<domínio>` e se for único. Ele é obrigatório.

- A senha deverá conter 6 caracteres. Ela é obrigatória.

- Caso exista uma pessoa com o mesmo email na base, retorna o seguinte erro:

  ```json
  {
    "message": "User already registered"
  }
  ```

- Caso contrário, retorna a mesma resposta do endpoint de `/login`, um token `JWT`:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível cadastrar um usuário com sucesso]**

Se o usuário for criado com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:

![Cadastro com sucesso](./public/cadastrodeusuario.png)

**[Foi validado que não é possível cadastrar usuário com o campo `displayName` menor que 8 caracteres]**

Se o usuário tiver o campo "displayName" menor que 8 caracteres o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Nome menor que 8](./public/nomemenorque8.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível cadastrar usuário com o campo `email` com formato `email: rubinho`]**

Se o usuário tiver o campo "email" com o formato `email: rubinho` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Email inválido](./public/emailinvalido.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível cadastrar usuário com o campo `email` com formato `email: @gmail.com`]**

Se o usuário tiver o campo "email" com o formato `email: @gmail.com` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Email inválido](./public/emailinvalido2.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que o campo `email` é obrigatório]**

Se o usuário não tiver campo "email" o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Email obrigatório](./public/emailobrigatorio.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível cadastrar usuário com o campo `password` diferente de 6 caracteres]**

Se o usuário tiver o campo "password" menor ou maior que 6 caracteres o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Senha menor que 6](./public/senhamenorque6.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que o campo `password` é obrigatório]**

Se o usuário não tiver campo "password" o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Senha Obrigatória](./public/semsenha.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Validar que não é possível cadastrar um usuário com email já existente]**

Se o usuário cadastrar o campo "email" com um email que já existe, o resultado retornado é conforme exibido abaixo, com um status http `409`:

![Usuário Existente](./public/usuariojaexistente.png)

### 2 - Endpoint POST `/login`

#### Os seguintes pontos foram construidos:

- O corpo da requisição deverá seguir o formato abaixo:

  ```json
  {
    "email": "email@mail.com",
    "password": "123456"
  }
  ```

- Caso algum desses campos seja inválido ou não exista um usuário correspondente no banco de dados, retorna um código de status 400 com o corpo `{ message: "Invalid fields" }`.

- Caso esteja tudo certo com o login, a resposta deve ser um token `JWT`, no seguinte formato:

  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7ImlkIjo1LCJkaXNwbGF5TmFtZSI6InVzdWFyaW8gZGUgdGVzdGUiLCJlbWFpbCI6InRlc3RlQGVtYWlsLmNvbSIsImltYWdlIjoibnVsbCJ9LCJpYXQiOjE2MjAyNDQxODcsImV4cCI6MTYyMDY3NjE4N30.Roc4byj6mYakYqd9LTCozU1hd9k_Vw5IWKGL4hcCVG8"
  }
  ```
  _O token anterior é fictício_

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível fazer login com sucesso]**

Se o login foi feito com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![Login com sucesso](./public/logincomsucesso.png)

**[Foi validado que não é possível fazer login sem o campo `email`]**

Se o login não tiver o campo "email" o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Sem login](./public/sememaillogin.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível fazer login sem o campo `password`]**

Se o login não tiver o campo "password" o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Sem senha](./public/semsenhalogin.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível fazer login com o campo `email` em branco]**

Se o login tiver o campo "email" em branco o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Email em branco](./public/emailbrancologin.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível fazer login com o campo `password` em branco]**

Se o login tiver o campo "password" em branco o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Senha em branco](./public/senhabrancologin.png)
(As contrabarras `\` estão escapando as aspas de dentro da string)

**[Foi validado que não é possível fazer login com um usuário que não existe]**

Se o login for com usuário inexistente o resultado retornado é conforme exibido abaixo, com um status http `400`:

![Usuário não existe](./public/usuarionaoexiste.png)

### 3 - Endpoint GET `/user`

#### Os seguintes pontos foram construidos:

- Deve listar todos os **Users** e retorná-los na seguinte estrutura:

  ```json
  [
    {
      "id": "401465483996",
      "displayName": "Brett Wiltshire",
      "email": "brett@email.com",
      "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
    }
  ]
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorna um código de `status 401`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível listar todos os usuários]**

Ao listar usuários com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![Listar usuários](./public/listarusuarios.png)

**[Foi validado que não é possível listar usuários sem o token na requisição]**

Se o token for inexistente o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Token Vazio](./public/tokenvazio.png)

**[Foi validado que não é possível listar usuários com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Token inválido](./public/tokeninvalido.png)

### 4 - Endpoint GET `/user/:id`

#### Os seguintes pontos foram construidos:

- Retorna os detalhes do usuário baseado no `id` da rota. Os dados devem ter o seguinte formato:

  ```json
  {
    "id": "401465483996",
    "displayName": "Brett Wiltshire",
    "email": "brett@email.com",
    "image": "http://4.bp.blogspot.com/_YA50adQ-7vQ/S1gfR_6ufpI/AAAAAAAAAAk/1ErJGgRWZDg/S45/brett.png"
  }
  ```

- A requisição deve ter token de autenticação nos headers e, caso contrário, retorna um código de `status 401`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível listar um usuário específico com sucesso]**

Ao listar um usuário com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![Listar um usuário](./public/listarumusuario.png)

**[Foi validado que não é possível listar um usuário inexistente]**

Se o usuário for inexistente o resultado retornado é conforme exibido abaixo, com um status http `404`:

![Listar um usuário inexistente](./public/usuarioinexistente.png)

**[Foi validado que não é possível listar um determinado usuário sem o token na requisição]**

Se o token for inexistente o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Listar um usuário sem token](./public/semtokenumusuario.png)

**[Foi validado que não é possível listar um determinado usuário com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Listar um usuário com token inválido](./public/tokeninvalidoumusuario.png)

### 5 - Endpoint POST `/categories`

#### Os seguintes pontos foram construidos:

- Esse endpoint deve receber uma _Categoria_ no corpo da requisição e criá-la no banco. O corpo da requisição deve ter a seguinte estrutura:

 ```json
  {
    "name": "Inovação"
  }
  ```

- Caso a Categoria não contenha o `name` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorna um código de `status 401`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível cadastrar uma categoria com sucesso]**

Se cadastrar uma categoria com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:

![Criar categoria com sucesso](./public/cadastrarCategoria.png)

**[Foi validado que não é possível cadastrar uma categoria sem o campo name]**

Se ao tentar cadastrar uma categoria sem o campo name o resultado retornado é conforme exibido abaixo, com um status http 400:
![Criar categoria com sucesso](./public/cadastrarCategoriaSemName.png)

**[Foi validado que não é possível cadastrar uma determinada categoria com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Cadastrar uma categoria com token inválido](./public/cadastrarcategoriacomtokeninvalido.png)

**[Foi validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**

Se o token for inexistente o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Cadastrar uma categoria sem token](./public/cadastrarcategoriasemtoken.png)

### 6 - Endpoint GET `/categories`

#### Os seguintes pontos foram construidos:

- Esse endpoint deve listar todas as Categorias e retorná-las na seguinte estrutura:

```json
[
  {
    "id": 1,
    "name": "Escola"
  },
  {
    "id": 2,
    "name": "Inovação"
  }
]
```

Além disso, as seguintes verificações foram feitas:
[Foi validado que é possível listar todas as categoria com sucesso]

Se buscar todas as categorias com sucesso o resultado retornado é conforme exibido abaixo, com um status http 200:

![Buscar todas as categoria com sucesso](./public/buscartodascategoriascomsucesso.png)


**[Foi validado que não é possível listar as categorias com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Buscar uma categoria com token inválido](./public/buscarcategoriacomtokeninvalido.png)

**[Foi validado que não é possível cadastrar uma determinada categoria sem o token na requisição]**

Se o token for inexistente o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Buscar uma categoria sem token](./public/buscarcategoriasemtoken.png)


### 7 - Endpoint POST `/post`

#### Os seguintes pontos foram construidos:

- Esse endpoint deve receber um _BlogPost_ no corpo da requisição e criá-lo no banco. O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "categoryIds": [1, 2]
  }
  ```

- Caso o post não contenha o `title`, `content` ou `categoryIds` a API deve retornar um erro de `status 400`.

- A requisição deve ter o token de autenticação nos headers e, caso contrário, retorna um código de `status 401`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível cadastrar um blogpost com sucesso]**

Se cadastrar um blogpost com sucesso o resultado retornado é conforme exibido abaixo, com um status http `201`:

![Criar blogspot com sucesso](./public/criarblogpost.png)

**[Foi validado que não é possível cadastrar um blogpost sem o campo `title`]**

Se não conter o campo `title` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost sem content](./public/camposemtitle.png)

**[Foi validado que não é possível cadastrar um blogpost sem o campo `content`]**

Se não conter o campo `content` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost sem content](./public/semcampocontent.png)

**[Foi validado que não é possível cadastrar um blogpost sem o campo `categoryIds`]**

Se não conter o campo `categoryIds` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost sem categoryId](./public/semcampocategoryid.png)

**[Foi validado que não é possível cadastrar um blogpost com uma `categoryIds` inexistente]**

Se o campo `categoryIds` tiver uma categoria inexistente, o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost categoryId invalida](./public/cadastrarpostcomcategoryidinvalida.png)


**[Foi validado que não é possível cadastrar um blogpost sem o token]**

Se não conter o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost sem token ](./public/criarpostsemtoken.png)

**[Foi validado que não é possível cadastrar um blogpost com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/criarposttokeninvalido.png)

### 8 - Endpoint GET `/post`

#### Os seguintes pontos foram construidos:

- Esse endpoint deve listar todos os _BlogPosts_ e retorná-los na seguinte estrutura:

```json
[
  {
    "id": 1,
    "title": "Post do Ano",
    "content": "Melhor post do ano",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2017_Malaysia.jpg"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      }
    ]
  }
]
```

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível listar blogpost com sucesso]**

Se listar os blogpost com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![Criar blogspot com sucesso](./public/listarumblogpost.png)

**[Foi validado que não é possível listar blogpost sem token]**

Se não conter o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost sem token ](./public/listarpostsemtoken.png)

**[Foi validado que não é possível listar blogpost com token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/listarposttokeninvalido.png)

### 9 - Endpoint GET `post/:id`

#### Os seguintes pontos foram construidos:

- Retorna um **BlogPost** com o `id` especificado. O retorno deve ter os seguinte formato:

```json
  {
  "id": 1,
  "title": "Post do Ano",
  "content": "Melhor post do ano",
  "userId": 1,
  "published": "2011-08-01T19:58:00.000Z",
  "updated": "2011-08-01T19:58:51.000Z",
  "user": {
    "id": 1,
    "displayName": "Lewis Hamilton",
    "email": "lewishamilton@gmail.com",
    "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
  },
  "categories": [
    {
      "id": 1,
      "name": "Inovação"
    }
  ]
}
```

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível listar um blogpost com sucesso]**

Se listar um blogpost com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![Listar um post com sucesso](./public/listarumpostcomsucesso.png)

**[Foi validado que não é possível listar um blogpost sem token]**

Se não conter o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/listaumpostsemtoken.png)

**[Foi validado que não é possível listar um blogpost com token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/listaumposttokeninvalido.png)

**[Foi validado que não é possível listar um blogpost inexistente]**

Se o id do post for inválido o resultado retornado é conforme exibido abaixo, com um status http `404`:

![Listar um post inexistente](./public/listarumpostinexistente.png)



### 10 - Endpoint PUT `/post/:id`

#### Os seguintes pontos foram construidos:

- O endpoint deve receber um **BlogPost** que irá sobrescrever o original com o `id` especificado na URL. Só deve ser permitido para o usuário que criou o **BlogPost**.

- A(s) categoria(s) do post **não** podem ser editadas, somente o `title` e `content`.

- O corpo da requisição deve ter a seguinte estrutura:

  ```json
  {
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key"
  }
  ```

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, retorna um código de `status 401`.

- Caso o post não contenha o `title` e/ou o `content` a API deve retornar um erro de `status 400`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível editar um blogpost com sucesso]**

Se editar um blogpost com sucesso o resultado retornado é conforme exibido abaixo, com um status http `200`:

![blogpost com token inválido](./public/editarpostcomsucesso.png)

**[Foi validado que não é possível editar as categorias de um blogpost]**

Só será possível editar o título ou o conteúdo de um post.

![editar com campo categorias](./public/editarpostcomcategorias.png)


**[Foi validado que não é possível editar um blogpost com outro usuário]**

Somente o usuário que criou o post poderá editá-lo.

![blogpost com token inválido](./public/editarcomoutrousuario.png)

**[Foi validado que não possível editar um blogpost sem token]**

Se não conter o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/editarsemtoken.png)

**[Foi validado que não possível editar um blogpost com token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/editartokeninvalido.png)

**[Foi validado que não possível editar um blogpost sem o campo `title`]**

Se não conter o campo `title` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost com token inválido](./public/editarsemtitle.png)

**[Foi validado que não possível editar um blogpost sem o campo `content`]**

Se não conter o campo `content` o resultado retornado é conforme exibido abaixo, com um status http `400`:

![blogpost com token inválido](./public/editarsemcontent.png)

## Requisitos Bônus

### 11 - Endpoint DELETE `post/:id`

#### Os seguintes pontos foram construidos:

- Deleta o post com o `id` especificado. Só deve ser permitido para o usuário que criou o **BlogPost**.

- Caso uma pessoa diferente de quem criou faça a requisição, deve retornar um código `status 401`.

- Caso uma requisição sem token seja recebida, retorna um código de `status 401`.

- Caso o post referido não exista, retorna um código de `status 404`.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível deletar um blogpost com sucesso]**

Se deletar blogpost com sucesso o resultado retornado é conforme exibido abaixo, com um status http `204`:

![blogpost com token inválido](./public/deletarpostcomsucesso.png)

**[Foi validado que não é possível deletar um blogpost com outro usuário]**

Se não for o dono do blogpost o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/deletarpostcomoutrousuario.png)

**[Foi validado que não é possível deletar um blogpost inexistente]**

Se o blogpost nao existir o resultado retornado é conforme exibido abaixo, com um status http `404`:

![blogpost com token inválido](./public/deletarpostquenaoexiste.png)

**[Foi validado que não é possível deletar um blogpost sem o token]**

Se não contém o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/deletarpostsemtoken.png)

**[Foi validado que não é possível deletar um blogpost com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/deletarpostcomtokeninvalido.png)

### 12 - Endpoint DELETE `/user/me`

#### Os seguintes pontos foram construidos:

- Utilizando o token de autenticação nos headers, o usuário correspondente deve ser apagado.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível excluir meu usuário com sucesso]**

Ao deletar um usuário com sucesso o resultado retornado é conforme exibido abaixo, com um status http `204`:

![Deletar com sucesso](./public/deletarcomsucesso.png)

**[Foi validado que não é possível excluir meu usuário com token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Deletar com token inválido](./public/deletarcomtokeninvalido.png)

**[Foi validado que não é possível excluir meu usuário sem o token]**

Se não conter o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![Deletar sem token](./public/deletarsemtoken.png)

### 13 - Endpoint GET `post/search?q=:searchTerm`

#### Os seguintes pontos foram construidos:

- Retorna uma array de **BlogPosts** que contenham em seu título, ou conteúdo, o termo pesquisado no `queryParam` da URL. O retorno deve ter o seguinte formato:

```json
[
  {
    "id": 2,
    "title": "Vamos que vamos",
    "content": "Foguete não tem ré",
    "userId": 1,
    "published": "2011-08-01T19:58:00.000Z",
    "updated": "2011-08-01T19:58:51.000Z",
    "user": {
      "id": 1,
      "displayName": "Lewis Hamilton",
      "email": "lewishamilton@gmail.com",
      "image": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg"
    },
    "categories": [
      {
        "id": 2,
        "name": "Escola"
      }
    ]
  }
]
  ```

- Caso nenhum **BlogPost** satisfaça a busca, retorna um array vazio.

### Além disso, as seguintes verificações foram feitas:

**[Foi validado que é possível buscar um blogpost pelo `title`]**

Se a buscar for pelo `title` o resultado retornado é conforme exibido abaixo, com um status http `200`:

![blogpost com token inválido](./public/buscarpostpelotitle.png)

**[Foi validado que é possível buscar um blogpost pelo `content`]**

Se a buscar for pelo `content` o resultado retornado é conforme exibido abaixo, com um status http `200`:

![blogpost com token inválido](./public/buscarpostpelocontent.png)

**[Foi validado que é possível buscar todos os blogpost quando passa a busca vazia']**

Se a buscar for vazia o resultado retornado é conforme exibido abaixo, com um status http `200`:

![blogpost com token inválido](./public/listarpostcampovazio.png)

**[Foi validado que é possível buscar um blogpost inexistente e retornar array vazio]**

Se a buscar um post inexistente o resultado retornado é conforme exibido abaixo, com um status http `200`:

![blogpost com token inválido](./public/listarumpostquenaoexiste.png)

**[Foi validado que não é possível buscar um blogpost sem o token]**

Se não contém o token o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/buscarpostsemtoken.png)

**[Foi validado que não é possível buscar um blogpost com o token inválido]**

Se o token for inválido o resultado retornado é conforme exibido abaixo, com um status http `401`:

![blogpost com token inválido](./public/buscarpostcomtokeninvalido.png)
