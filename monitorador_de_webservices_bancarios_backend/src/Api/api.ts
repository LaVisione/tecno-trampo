import express, { Request, Response } from 'express';
import { RegisterServices } from '../services/RegisterServices';
import axios from 'axios';

const app = express();
const service = new RegisterServices();
const port = 3000;

app.use(express.json());

app.post('/api/v1/boletos/lote', async (req: Request, res: Response) => {
    let start: number = 0;

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

    try {
        start = Date.now();

        const response = await axios.post(url, body, { headers });

        const end = Date.now();

        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        service.save(response, false, duration);

        res.status(200).send('OK');

    } catch (error) {
        const end = Date.now();
        const duration = end - start;

        console.log(`\nTempo da requisição: ${duration} ms`);

        res.status(500).send('Validar log');

        service.save(error, true, duration);
    }

});

app.listen(port, () => {
    console.log(`\nServer is running on port ${port}`);
});
