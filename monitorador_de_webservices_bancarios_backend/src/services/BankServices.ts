import { RepositoryBank } from "../repository/RepositoryBank";

const repository = new RepositoryBank();

export class BankServices {
    
    public updateStatus(id: number, status: string) {
        console.log("\nCHEGOU NA BANK-SERVICE");
        repository.updateById(id,status);
        //repository.getAllOrderedById();
    }
}