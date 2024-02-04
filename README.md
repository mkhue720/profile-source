
# Profile-source

This is the source code used to introduce myself.

## Install

Clone the project

```bash
  git clone https://github.com/mkhue720/profile-source
```

Go to the project directory

```bash
  cd profile-source
```

Install dependencies

```bash
  npm install
```
Start the client
```bash
  cd client
```

```bash
  npm run dev
```

Start the server
```bash
  cd server
```

```bash
  npm start
```


## Deployment

To deploy this project run

```bash
  cd client
```

```bash
  npm run build
```


## Demo

Demo: https://demo.nmk2844.id.vn/


## Features

- Light/dark mode toggle
- Live previews
- The project utilizes GitHub's API
- Contact form use EmailJS's API
- Use JWT
- Use Babel to convert from ES6 to ES5 ...
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URL`

`JWT_SECRET_KEY`


## Documentation

[Vitejs](https://vitejs.dev/),
[Babel](https://babeljs.io/docs/),
[JWT](https://jwt.io/),
[Nodejs](https://nodejs.org/docs/latest/api/),
[EmailJS](https://www.emailjs.com/docs/),
[Github API](https://docs.github.com/en/rest?apiVersion=2022-11-28)


## License

[MIT](https://github.com/mkhue720/profile-source/blob/main/LICENSE)


## Support

For support, email mkhue720@gmail.com .


## API Reference

http://localhost:3000/api/v1

**User**

#### Register user

```http
  POST /auth/register
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `name`      | `string` | **Required**. Name of user to fetch |
| `email`      | `string` | **Required**. Email of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |
| `role`      | `string` | **Required**. Default: admin |

#### Login user

```http
  POST /auth/login
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `email`      | `string` | **Required**. Email of user to fetch |
| `password`      | `string` | **Required**. Password of user to fetch |


**Blog**

#### Get all blogs

```http
  GET /blogs/
```



#### Get blog

```http
  GET /blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to fetch |

#### Add blog

```http
  POST /blogs/add
```

##### Body/form-data 

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `Title`      | `string` | **Required**. Title of blog to fetch |
| `Author`      | `string` | **Required**. Author of blog to fetch |
| `Image`      | `String` | **Required**. Image of blog to fetch |
| `Content`      | `string` | **Required**. Content of blog to fetch |

#### Update blog

```http
  PUT /blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to fetch |

#### Delete blog

```http
  DELETE /blogs/${id}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of blog to fetch |

