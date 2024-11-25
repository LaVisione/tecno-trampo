const express = require('express');
const { Client } = require('pg');
const cors = require('cors');

const app = express();
const port = 3001;

// Configuração do middleware
app.use(cors());
app.use(express.json());

// Configuração do cliente PostgreSQL
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '1234',
    database: 'postgres'
});

// Conexão com o banco de dados
client.connect()
    .then(() => console.log('Conectado ao banco de dados PostgreSQL'))
    .catch(err => console.error('Erro ao conectar ao banco de dados:', err));

// Rota para buscar os dados por ID do banco
app.get('/api/postgres/:idBanco', async (req, res) => {
    const { idBanco } = req.params;

    try {
        // Consulta ao banco de dados
        const result = await client.query(`
            SELECT r.*, b.nome_banco, b.versao_banco 
            FROM registros r 
            JOIN bancos b ON r.id_banco = b.id_banco
            WHERE b.id_banco = $1
        `, [idBanco]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Banco não encontrado ou sem registros.' });
        }

        res.json(result.rows);
    } catch (err) {
        console.error('Erro ao buscar os dados:', err);
        res.status(500).send('Erro ao buscar dados');
    }
});

// Inicialização do servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
