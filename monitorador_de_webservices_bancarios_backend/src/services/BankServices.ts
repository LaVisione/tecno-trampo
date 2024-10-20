import { RepositoryBank } from "../repository/RepositoryBank";

const repository = new RepositoryBank();

export class BankServices {
    
    public updateStatus(id: number, status: object[]) {
        console.log("DENTRO DO UPDADEBANK", status)
        //repository.updateById(id,status);
    }
}