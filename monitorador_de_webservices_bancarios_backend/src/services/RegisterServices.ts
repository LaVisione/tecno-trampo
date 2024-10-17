import{ Registros } from '../models/Registros';

export class RegisterServices {

    public save(response: any, isWithErros: boolean, duration: number): void {
        this.isNull(response);
       
        if (isWithErros == true) {
            console.log("\nCHEGOU NA SERVICE ATRAVES DE UM ERRO");
            this.saveWithErrors(response, isWithErros, duration);
            return;
        }

        console.log("\nCHEGOU NA SERVICE SEM ERRO");

        console.log('\nStatus Code:', response.status);
        console.log('\nData:', response.headers.date);
        console.log('\nMensagem: SUCESSO!'); // por ser status 200 eu posso apenas dizer que deu tudo certo ou preciso do valor real 
        console.log('\nTempo de Resposta (ms):', duration); 
        console.log('\nJSONB:', JSON.stringify(response.data, null, 2));
        return;
    };

    private isNull(response: any): void{
        if (response == null) {
            return;
        }
    }   

    private saveWithErrors(response: any, isWithErros: boolean, duration: number): void {
        console.log('\nResponse\n\n:',response);
        console.log('\nStatus Code:',response.status);
        console.log('\nData:', response.response.headers.date);
        console.log('\nMensagem:',response.message); 
        console.log('\nTempo de Resposta (ms):', duration); 
        console.log('\nJSONB:', JSON.stringify(response.response.data, null, 2));
    }
    
}

