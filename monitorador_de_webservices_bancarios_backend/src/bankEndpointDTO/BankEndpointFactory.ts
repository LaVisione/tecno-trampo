import { BankEndpoint } from './BankEnpoint';

export class BankEndpointFactory {

  private static url: string = "http://homologacao.plugboleto.com.br/api/v1/boletos/lote";

  private static headers = {
    'cnpj-sh': '12067625000150',
    'token-sh': 'a60c428fbfcafa73bc8eda5e9b7fee4e',
    'cnpj-cedente': '26775488000112',
    'Content-Type': 'application/json',
  };

  private static body = [{
    "CedenteContaNumero": "",
    "CedenteContaNumeroDV": "",
    "CedenteConvenioNumero": "",
    "CedenteContaCodigoBanco": "",
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
    "TituloMensagem03": " sujito a protesto apos 30 dias",
    "TituloNumeroDocumento": "321",
    "TituloDocEspecie": "01",
    "TituloNossoNumero": "784514575",
    "TituloValor": "50,00",
    "titulosacadoravalistaenderecoNumero": "155",
    "TituloLocalPagamento": "Pagável em qualquer banco até o vencimento.",
    "TituloSacadorAvalistaBairro": "JDestes"
  }];

  private static specificFieldBody: { [id: number]: { CedenteContaNumero: string, CedenteContaNumeroDV: string, CedenteConvenioNumero: string, CedenteContaCodigoBanco: string } } = {
    1: { CedenteContaNumero: "123456", CedenteContaNumeroDV: "7", CedenteConvenioNumero: "9845623", CedenteContaCodigoBanco: "001" },
    6: { CedenteContaNumero: "13141", CedenteContaNumeroDV: "6", CedenteConvenioNumero: "13141", CedenteContaCodigoBanco: "748" },

  };

  public static buildBankEndpoint(id: number): BankEndpoint {
    const specificFields = this.specificFieldBody[id];

    const filledBody = [{
      ...this.body[0],
      ...specificFields
    }];

    console.log("FACTORY BANK", filledBody);

    return new BankEndpoint(id, this.url, this.headers, filledBody);
  }

}