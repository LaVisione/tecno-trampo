import express, { Request, Response } from 'express';
import { sequelize } from '../database/database';
import { RepositoryBank } from '../repository/RepositoryBank';
import { RecordsServices } from '../services/RecordsServices';
import { BankServices } from '../services/BankServices';
import axios from 'axios'
import cron from 'node-cron';

const app = express();
app.use(express.json());
const recordsServices = new RecordsServices();
const bankServices = new BankServices();

const url = 'http://homologacao.plugboleto.com.br/api/v1/boletos/lote';
const headers = {
    'cnpj-sh': '12067625000150',
    'token-sh': 'a60c428fbfcafa73bc8eda5e9b7fee4e',
    'cnpj-cedente': '26775488000112',
    'Content-Type': 'application/json',
};
const body = [
    {
        "CedenteContaNumero": "123456",
        "CedenteContaNumeroDV": "7",
        "CedenteConvenioNumero": "9845623",
        "CedenteContaCodigoBanco": "001",
        "SacadoCPFCNPJ": "08357906000170",
        "SacadoEnderecoNumero": "987",
        "SacadoEnderecoBairro": "Centro",
        "SacadoEnderecoCEP": "87045430",
        "SacadoEnderecoCidade": "Maringá",
        "SacadoEnderecoComplemento": "Fundos",
        "SacadoEnderecoLogradouro": "Rua teste, 987",
        "SacadoEnderecoPais": "Brasil",
        "SacadoEnderecoUF": "PR",
        "SacadoNome": "FooBarTeste",
        "SacadoTelefone": "4499999999",
        "SacadoCelular": true,
        "TituloDataEmissao": "08/10/2024",
        "TituloDataVencimento": "09/10/2024",
        "TituloMensagem01": "Teste",
        "TituloMensagem02": "Nao receber apos 30 dias de atraso",
        "TituloMensagem03": "sujito a protesto apos 30 dias",
        "TituloNumeroDocumento": "321",
        "TituloDocEspecie": "01",
        "TituloNossoNumero": "784514575",
        "TituloValor": "50,00",
        "titulosacadoravalistaenderecoNumero": "155",
        "TituloLocalPagamento": "Pagável em qualquer banco até o vencimento.",
        "TituloSacadorAvalistaBairro": "JDestes"
    }
];
const interval = 5 * 60 * 1000;
const port = 3000;

// Conectar ao banco de dados
sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');
    })
    .catch((err) => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

//Iniciar bancos
sequelize.sync().then(() => {
    RepositoryBank.initBanks();
    console.log('Bancos inseridos/verificados.');
});

//teste via postman:

app.post('/api/v1/boletos/lote', async (req: Request, res: Response) => {
    const url = 'http://homologacao.plugboleto.com.br/api/v1/boletos/lote';
    const headers = {
        'cnpj-sh': '12067625000150',
        'token-sh': 'a60c428fbfcafa73bc8eda5e9b7fee4e',
        'cnpj-cedente': '26775488000112',
        'Content-Type': 'application/json',
    };
    const body = [
        {
            "CedenteContaNumero": "123456",
            "CedenteContaNumeroDV": "7",
            "CedenteConvenioNumero": "9845623",
            "CedenteContaCodigoBanco": "001",
            "SacadoCPFCNPJ": "08357906000170",
            "SacadoEnderecoNumero": "987",
            "SacadoEnderecoBairro": "Centro",
            "SacadoEnderecoCEP": "87045430",
            "SacadoEnderecoCidade": "Maringá",
            "SacadoEnderecoComplemento": "Fundos",
            "SacadoEnderecoLogradouro": "Rua teste, 987",
            "SacadoEnderecoPais": "Brasil",
            "SacadoEnderecoUF": "PR",
            "SacadoNome": "FooBarTeste",
            "SacadoTelefone": "4499999999",
            "SacadoCelular": true,
            "TituloDataEmissao": "08/10/2024",
            "TituloDataVencimento": "09/10/2024",
            "TituloMensagem01": "Teste",
            "TituloMensagem02": "Nao receber apos 30 dias de atraso",
            "TituloMensagem03": "sujito a protesto apos 30 dias",
            "TituloNumeroDocumento": "321",
            "TituloDocEspecie": "01",
            "TituloNossoNumero": "784514575",
            "TituloValor": "50,00",
            "titulosacadoravalistaenderecoNumero": "155",
            "TituloLocalPagamento": "Pagável em qualquer banco até o vencimento.",
            "TituloSacadorAvalistaBairro": "JDestes"
        }
    ];

    let start: number = 0;

    try {
        start = Date.now();

        const response = await axios.post(url, body, { headers });

        console.log(response);

        const end = Date.now();

        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(200).send('OK');

        recordsServices.save(response, false, duration);

        bankServices.updateStatus(1, response.status.toString());
    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(500).send('Validar log');

        recordsServices.save(error, true, duration);
        
        const responseError = (error as { response?: { status: number } }).response;

        if (responseError) {
            bankServices.updateStatus(1, responseError.status.toString());
        } else {
            bankServices.updateStatus(1, "Não existe respone");
        }
    }

});

app.get('/api/v1/boletos/lote',async(req: Request, res: Response) =>{
    const { id_banco } = req.query; // id_banco é um string, busque no postman passando id na URL

    try {
        const registros = await recordsServices.queryDatabase(id_banco as string); 
        res.status(200).json(registros);
        console.log('Registros retornados:', registros);
    } catch (error) {
        console.error('Erro ao buscar registros:', error);
        res.status(500).send('Erro ao buscar registros');
    }
});

//------------------------------

const sendApi = async () => {
    let start: number = 0;

    try {
        start = Date.now();

        const response = await axios.post(url, body, { headers });

        console.log(response);

        const end = Date.now();

        const duration = end - start;

        recordsServices.save(response, false, duration);

        bankServices.updateStatus(1, response.status.toString());
    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        recordsServices.save(error, true, duration);

        const responseError = (error as { response?: { status: number } }).response;
        
        if (responseError) {
            bankServices.updateStatus(1, responseError.status.toString());
        } else {
            bankServices.updateStatus(1, "Não existe respone");
        }
    }

};

setInterval(sendApi, interval);

cron.schedule('00 20 * * *', () => {
    recordsServices.callFunction();
    console.log('Limpeza de registros antigos realizada.');
});

app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`);
});