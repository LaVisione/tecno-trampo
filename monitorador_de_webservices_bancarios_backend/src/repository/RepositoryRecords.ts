import { Records } from "../models/Records";
import { Op } from 'sequelize';

export class RepositoryRecords {

    public async saveRecords(id_banco: number, status_code: string, mensagem: string, tempo_resposta: number, jsonb_response: object) {
        try {
            console.log("\nCHEGOU NA RECORDS-REPOSITORY");
            await Records.create({
                id_banco,
                status_code,
                mensagem,
                tempo_resposta,
                jsonb_response
            });
        } catch (error) {
            console.error('Erro ao salvar o registro:', error);
            throw new Error('Erro ao executar RepositoryRecords, consulte os logs');
        }
    }


    public clearDatabase = async () => {
        const days = new Date();

        days.setDate(days.getDate() - 60);

        await Records.destroy({
            where: {
                createdAt: {
                    [Op.lt]: days, // Menor que 60 dias atrás
                },
            },
        });
    }

    async getAllByBankId(id_banco: string) {
        return await Records.findAll({
            where: {
                id_banco: id_banco,
            },
        });
    }

}
