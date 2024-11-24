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
    "TituloDataEmissao": "11/11/2024",
    "TituloDataVencimento": "30/11/2024",
    "TituloMensagem01": "Teste",
    "TituloMensagem02": "Nao receber apos 30 dias de atraso",
    "TituloMensagem03": " sujito a protesto apos 30 dias",
    "TituloNumeroDocumento": "321",
    "TituloDocEspecie": "01",
    "TituloNossoNumero": "784514573",
    "TituloValor": "50,00",
    "titulosacadoravalistaenderecoNumero": "155",
    "TituloLocalPagamento": "Pagável em qualquer banco até o vencimento.",
    "TituloSacadorAvalistaBairro": "JDestes"
  }];

  private static specificFieldBody: { [id: number]: Partial<{ 
    CedenteContaNumero: string, 
    CedenteContaNumeroDV: string, 
    CedenteConvenioNumero: string, 
    CedenteContaCodigoBanco: string,
    TituloNossoNumero: string,
    ContaCodigoBeneficiario: string,
    tituloaceite: string,
    TituloCodBaixaDevolucao: string,
    tituloprazobaixa: string,
    
  }> } = {
    1: { CedenteContaNumero: "123456", CedenteContaNumeroDV: "7", CedenteConvenioNumero: "9845623", CedenteContaCodigoBanco: "001" },
    4: { CedenteContaNumero: "1213141", CedenteContaNumeroDV: "5", CedenteConvenioNumero: "121314", CedenteContaCodigoBanco: "756", TituloNossoNumero: "1234569" },
    5: { CedenteContaNumero: "9463228", CedenteContaNumeroDV: "6", CedenteConvenioNumero: "946322", CedenteContaCodigoBanco: "756", TituloNossoNumero: "7777778" },
    6: { CedenteContaNumero: "13141", CedenteContaNumeroDV: "6", CedenteConvenioNumero: "13141", CedenteContaCodigoBanco: "748" , TituloNossoNumero: "12345" },
    7: { CedenteContaNumero: "13141", CedenteContaNumeroDV: "6", CedenteConvenioNumero: "15161", CedenteContaCodigoBanco: "748" , TituloNossoNumero: "54321" },
    8: { CedenteContaNumero: "171819202122", CedenteContaNumeroDV: "2", CedenteConvenioNumero: "1718192", CedenteContaCodigoBanco: "104" , TituloNossoNumero: "54321" , ContaCodigoBeneficiario: "6562", tituloaceite: "S", TituloCodBaixaDevolucao: "1", tituloprazobaixa: "55" },
    10: { CedenteContaNumero: "064578", CedenteContaNumeroDV: "8", CedenteConvenioNumero: "771540279", CedenteContaCodigoBanco: "041" , TituloNossoNumero: "698332" },
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