import { RepositoryRecords } from '../repository/RepositoryRecords';

const { format } = require('date-fns');

const now = new Date();   
const repository = new RepositoryRecords();


export class RecordsServices {

    public save(id: number, response: any, isWithErros: boolean, duration: number): void {
        this.isNull(response);

        const responseData = {
            headers: response.headers,
            data: response.data,
        };

        if (isWithErros == true) {
            console.log("\nCHEGOU NA RECORDS-SERVICE ATRAVES DE UM ERRO");
            this.saveWithErrors(id, response, isWithErros, duration);
            return;
        }

        console.log("\nCHEGOU NA RECORDS-SERVICE SEM ERRO");

        console.log('\nStatus Code:', response.status);
        console.log('\nData:', response.headers.date);
        console.log('\nMensagem: SUCESSO!');
        console.log('\nTempo de Resposta (ms):', duration);
        //console.log('\nJSONB:', responseData);

        repository.saveRecords(id, response.status, "Sucesso!", duration, responseData, false);
        return;
    };

    private isNull(response: any): void {
        if (response == null) {
            return;
        }
    }

    private saveWithErrors(id: number, response: any, isWithErros: boolean, duration: number): void {
        console.log('\nStatus Code:', response.status);
        console.log('\nData:', response.response.headers.date);
        console.log('\nMensagem:', response.message);
        console.log('\nTempo de Resposta (ms):', duration);
        //console.log('\nJSONB:', response.response.data);
        
        repository.saveRecords(id, response.status, response.message, duration, response.response.data, true);
    }

    public callFunction() {
        repository.clearDatabase();
    }

    public async getRecordsError(id_banco: string) {
        let  records = await repository.findRecordsError(id_banco);
    
        records.forEach(record => {
            record.dataValues.createdAt = this.dateFormattedBr(record.dataValues.createdAt);
        });

        return records;
    }

    public async findRecordsWithParams(id_banco: string, startDate: object, endDate: object) {
        return await repository.queryDatabaseFindRecords(id_banco, startDate, endDate);
    }

    public convertToDates(start_date: string, end_date: string) {
        if (!this.isValidString(start_date) && !this.isValidString(end_date)) {
            return this.setDefaultDates();
        }

        const startDate = this.parseDate(start_date, 0);
        const endDate = this.parseDate(end_date, 23, 59, 59);
        
        return { startDate, endDate };
    }

    private setDefaultDates() {
        let startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0); 
        let endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        startDate = this.dateFormatted(startDate);
        endDate = this.dateFormatted(endDate);

        return {
            startDate: startDate,
            endDate: endDate
        };
    }

    private isValidString(str: string | null | undefined): boolean {
        return str != null && str !== ""; 
    }

    private dateFormattedBr(date: Date) {
        return format(date, 'dd-MM-yyyy HH:mm:ss');
    }

    private dateFormatted(date: Date) {
        return format(date, 'yyyy-MM-dd HH:mm:ss');
    }

    private parseDate(dateString: string, hours: number = 0, minutes: number = 0, seconds: number = 0): Date {
        const [day, month, year] = dateString.split('/').map(Number);
        const date = new Date(year, month - 1, day, hours, minutes, seconds);
        return this.dateFormatted(date);
    }
}

