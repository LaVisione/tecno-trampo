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

sequelize
    .authenticate()
    .then(() => {
        console.log('Conexão com o banco de dados estabelecida com sucesso.');

        return sequelize.sync();
    })
    .then(() => {
        console.log('Sincronização do banco de dados concluída.');

        return RepositoryBank.initBanks()
            .then(() => {
                console.log('Bancos inseridos/verificados.');
                return callRecords();
            });
    })
    .then(() => {
        console.log('Status verificados!!');
    })
    .catch((err) => {
        console.error('Erro durante o processo:', err);
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

        const end = Date.now();

        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(200).send('OK');

        recordsServices.save(id, response, false, duration);

        bankServices.updateStatus(id, response.status.toString());
    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(500).send('Validar log');

        recordsServices.save(id, error, true, duration);

        const responseError = (error as { response?: { status: number } }).response;

        if (responseError) {
            bankServices.updateStatus(id, responseError.status.toString());
        } else {
            bankServices.updateStatus(id, "Não existe response");
        }
    }

});

//------------------------------

app.get('/api/v1/boletos/lote/:id_banco', async (req: Request, res: Response) => {
    const { id_banco } = req.params;
    const { data_inicio, data_fim } = req.query;

    const { startDate, endDate } = recordsServices.convertToDates(data_inicio as string, data_fim as string);

    try {
        const records = await recordsServices.findRecordsWithParams(id_banco, startDate, endDate);

        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }

});

app.get('/api/v1/boletos/lote/:id_banco/error', async (req: Request, res: Response) => {
    const { id_banco } = req.params;

    try {
        const records = await recordsServices.getRecordsError(id_banco);
        res.status(200).json({ records });
    } catch (error) {
        res.status(500).json({ message: 'Erro no servidor', error });
    }

});


const sendApi = async (id: number) => {
    let start: number = 0;

    try {
        start = Date.now();

        bankEndpoint = BankEndpointFactory.buildBankEndpoint(id);

        const response = await axios.post(bankEndpoint.getUrl(), bankEndpoint.getBody(), { headers: bankEndpoint.getHeaders() });

        const end = Date.now();

        const duration = end - start;

        recordsServices.save(id, response, false, duration);

        bankServices.updateStatus(id, response.status.toString());
    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        recordsServices.save(id, error, true, duration);

        const responseError = (error as { response?: { status: number } }).response;

        if (responseError) {
            bankServices.updateStatus(id, responseError.status.toString());
        } else {
            bankServices.updateStatus(id, "Não existe respone");
        }
    }

};

const callRecords = async () => {
    for (let i = 1; i <= 11; i++) {
        await sendApi(i);
    }
};

setInterval(callRecords, interval);

cron.schedule('00 20 * * *', () => {
    recordsServices.callFunction();
});