const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 3000;

// Chave secreta para assinatura dos tokens
const SECRET_KEY = 'seu-segredo-aqui';

// Simulando um banco de dados de usuários
const users = [
  {
    id: "2727",
    fname: "Andre",
    lname: "Luis",
    dob: "1975-02-19",
    cpf: "85442869090",
    username: "Dé",
    diagnosis: "Depressão"
  },
  {
    id: "2728",
    fname: "Henrique",
    lname: "Fontoura",
    dob: "1979-03-30",
    cpf: "72662803037",
    username: "Henrique",
    diagnosis: "Mente confusa"
  },
  {
    id: "2729",
    fname: "Selina",
    lname: "Dion",
    dob: "1980-06-21",
    cpf: "19779934006",
    username: "Se",
    diagnosis: "None"
  }
];

// Middleware para verificar o token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401); // Não autorizado

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Proibido
    req.user = user; // Armazena informações do usuário
    next(); // Passa para o próximo middleware
  });
};

// Endpoint para login (gera um token)
app.post('/api/login', (req, res) => {
  // Aqui você deve autenticar o usuário com um banco de dados
  // Simulando uma autenticação bem-sucedida para o usuário Bruce
  const user = { id: "2727", username: "bman" }; // Exemplo de usuário

  const token = jwt.sign(user, SECRET_KEY, { expiresIn: '1h' }); // Gera o token
  res.json({ token });
});

// Endpoint para obter informações do usuário (precisa de autenticação)
app.get('/api/v3/users', authenticateToken, (req, res) => {
  const userId = req.query.id;
  const user = users.find(u => u.id === userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Aqui você deve verificar se o usuário tem permissão para acessar este recurso
  return res.json(user);
});

// Iniciando o servidor
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
