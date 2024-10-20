import { RepositoryRecords } from '../repository/RepositoryRecords';

const repository = new RepositoryRecords();


export class RecordsServices {

    public save(response: any, isWithErros: boolean, duration: number): void {
        this.isNull(response);
        
        const responseData = {
            headers: response.headers,
            data: response.data,  
        };

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
        console.log('\nJSONB:', responseData);
        
        repository.saveRecords(1,response.status, "Sucesso!", duration, responseData);
        return;
    };

    private isNull(response: any): void{
        if (response == null) {
            return;
        }
    }   

    private saveWithErrors(response: any, isWithErros: boolean, duration: number): void {
        console.log('\nStatus Code:',response.status);
        console.log('\nData:', response.response.headers.date);
        console.log('\nMensagem:',response.message); 
        console.log('\nTempo de Resposta (ms):', duration); 
        console.log('\nJSONB:', response.response.data);

        repository.saveRecords(1,response.status, response.message, duration, response.response.data);
    }
    
}

