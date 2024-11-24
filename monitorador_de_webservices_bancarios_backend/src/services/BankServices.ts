import { RepositoryBank } from "../repository/RepositoryBank";

const repository = new RepositoryBank();

export class BankServices {

    public updateStatus(id: number, status: string) {
        console.log("\nCHEGOU NA BANK-SERVICE", status);
        status = this.formatStatus(status);
        repository.updateById(id, status);
    }

    private formatStatus(status: string) {
        const statusCode = Number(status);

        if (statusCode >= 100 && statusCode <= 499) {
            return 'Online';
        } else {
            return 'Offline';
        }
    }
}