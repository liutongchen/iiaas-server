# iiaas-server

### What is this project

IIaaS stands for "Incrementing Integer as a Service". It's a toy project including a set of RESTful APIs as well as an SPA client.

The client-side code is placed in a separate repo: https://github.com/liutongchen/iiaas-client

### How to try this project

IIaaS is hosted on: https://incrementmyinteger.herokuapp.com/

If you want to try it locally, you can do the following:

1. Clone this repository: `git clone https://github.com/liutongchen/`

2. Instatll packages: `npm install`

3. Run: `npm start`

### Endpoints

#### User CRUD (RESTful)

`api/users` contains a set of RESTful APIs supporting CRUD operations to all the users. You can do `GET`, `POST`, `PATCH`, and `DELETE` to each user.

For example, to increment an integer, you can use POSTMAN to send PATCH request to `api/users/{id}`, with request body being: `{ "currentNumber": "inc" }`.

For resetting an integer, you only need to put a specific number in the PATCH request body instead of "inc", e.g. `{ "currentNumber": 100 }`.

You need to include `apiKey` in headers for most of the operations (except for POST api/users).

Following a REST design convention adopted by many companies, all endpoints supports query parameter `fields` for the response to only include needed fields. For instance:

`GET api/users/123?fields=email,apiKey` only returns email and API key in the response.

#### Login (non-RESTful)

`api/login` is the endpoint for user to log in, you need to post a request with email and password as body, for instance:

`{ "email": "liutong.clt@gmail.com", "password": "123456" }`

`api/login` is NOT a RESTful API.

To know more about it , feel free to contact me via mailto:liutong.clt@gmail.com or talk to me in person :)
