require('dotenv').config();
const express = require('express');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

const userCreate = require('./controllers/userCreate');
const userLogin = require('./controllers/userLogin');
const allUsers = require('./controllers/allUsers');
const userById = require('./controllers/userById');
const categorieCreate = require('./controllers/categorieCreate');
const allCategories = require('./controllers/allCategories');
const getPostById = require('./controllers/getPostById');
const editPost = require('./controllers/editPost');
const blogPost = require('./controllers/blogPost');
const allPosts = require('./controllers/allPosts');
const deletePost = require('./controllers/deletePost');
const error = require('./middlewares/error');
const authName = require('./middlewares/authName');
const authEmail = require('./middlewares/authEmail');
const authPass = require('./middlewares/authPass');
const validateEmail = require('./middlewares/validateEmail');
const validateLogin = require('./middlewares/validateLogin');
const validateToken = require('./middlewares/validateToken');
const validatePost = require('./middlewares/validatePost');
const authUserTo = require('./middlewares/authUserTo');
const authEditBodyReq = require('./middlewares/authEditBodyReq');
const postExist = require('./middlewares/postExist');

app.post('/user', authName, authEmail, authPass, validateEmail, userCreate);
app.post('/login', authEmail, authPass, validateLogin, userLogin);
app.get('/user', validateToken, allUsers);
app.get('/user/:id', validateToken, userById);
app.post('/categories', validateToken, categorieCreate);
app.get('/categories', validateToken, allCategories);
app.post('/post', validateToken, validatePost, blogPost);
app.get('/post', validateToken, allPosts);
app.get('/post/:id', validateToken, postExist, getPostById);
app.put('/post/:id', validateToken, authEditBodyReq, authUserTo, editPost);
app.delete('/post/:id', validateToken, postExist, authUserTo, deletePost);

app.use(error);