import express, { Request, Response } from 'express';
import { sequelize } from '../database/database';
import { RepositoryBank } from '../repository/RepositoryBank';
import { RecordsServices } from '../services/RecordsServices';
import { BankServices } from '../services/BankServices';
import { BankEndpoint } from '../bankEndpointDTO/BankEnpoint';
import { BankEndpointFactory } from '../bankEndpointDTO/BankEndpointFactory';
import axios from 'axios'
import cron from 'node-cron';

const app = express();
app.use(express.json());

const recordsServices = new RecordsServices();
const bankServices = new BankServices();
let bankEndpoint = new BankEndpoint(0, "", {}, {});
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

app.post('/api/v1/boletos/lote/:id_banco', async (req: Request, res: Response) => {
    const { id_banco } = req.params; 
    
    let start: number = 0;
    let id = Number(id_banco);

    try {
        start = Date.now();

        bankEndpoint = BankEndpointFactory.buildBankEndpoint(id);

        console.log(bankEndpoint);

        const response = await axios.post(bankEndpoint.getUrl(), bankEndpoint.getBody(), { headers: bankEndpoint.getHeaders() });

        console.log(response);

        const end = Date.now();

        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(200).send('OK');

        recordsServices.save(response, false, duration);

        bankServices.updateStatus(id, response.status.toString());
    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(500).send('Validar log');

        recordsServices.save(error, true, duration);
        
        const responseError = (error as { response?: { status: number } }).response;

        if (responseError) {
            bankServices.updateStatus(id, responseError.status.toString());
        } else {
            bankServices.updateStatus(id, "Não existe respone");
        }
    }

});

app.get('/api/v1/boletos/lote/:id_banco', async(req: Request, res: Response) =>{
    const { id_banco } = req.params; 
    const { data_inicio, data_fim } = req.query;

    const { startDate, endDate } = recordsServices.convertToDates(data_inicio as string, data_fim as string);

    console.log("\nSTART DATE:", startDate);
    console.log("\nEND DATE:", endDate);

    try {
        const records = await recordsServices.findRecordsWithParams(id_banco, startDate, endDate);

        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
    
});

app.get('/api/v1/boletos/lote/:id_banco/error', async(req: Request, res: Response) =>{
    const { id_banco } = req.params; 

    try {
        const records = await recordsServices.getRecordsError(id_banco);
        res.status(200).json({ records });
        console.log('REGISTRO DATA', records);
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }
    
});

//------------------------------

/*const sendApi = async () => {
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

};*/

//etInterval(sendApi, interval);

cron.schedule('00 20 * * *', () => {
    recordsServices.callFunction();
    console.log('Limpeza de registros antigos realizada.');
});

app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`);
});