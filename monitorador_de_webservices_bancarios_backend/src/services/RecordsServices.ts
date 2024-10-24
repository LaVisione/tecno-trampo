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
            console.log("\nCHEGOU NA RECORDS-SERVICE ATRAVES DE UM ERRO");
            this.saveWithErrors(response, isWithErros, duration);
            return;
        }

        console.log("\nCHEGOU NA RECORDS-SERVICE SEM ERRO");

        console.log('\nStatus Code:', response.status);
        console.log('\nData:', response.headers.date);
        console.log('\nMensagem: SUCESSO!');
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
    
    public callFunction(){
        repository.clearDatabase();
    }

    private getDateCondition(interval: string) {
        const now = new Date();
        switch (interval) {
            case '24h':
                now.setHours(now.getHours() - 24);
                break;
            case '7d':
                now.setDate(now.getDate() - 7);
                break;
            case '30d':
                now.setDate(now.getDate() - 30);
                break;
            default:
                throw new Error('Intervalo inválido');
        }
        return now;
    }

    public async queryDatabase(id_banco: string) {
        return await repository.getAllByBankId(id_banco);
    }
}

