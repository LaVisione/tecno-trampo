import { RepositoryBank } from "../repository/RepositoryBank";

const repository = new RepositoryBank();

export class BankServices {
    
    public updateStatus(id: number, status: string) {
        repository.updateById(id,status);
    }
}