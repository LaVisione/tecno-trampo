import { Records } from "../models/Records";
import { Op } from 'sequelize';
//import dayjs from 'dayjs';

export class RepositoryRecords {

    public async saveRecords(id_banco: number, status_code: string, mensagem: string, tempo_resposta: number, jsonb_response: object, isError: boolean) {
        try {
            console.log("\nCHEGOU NA RECORDS-REPOSITORY");
            await Records.create({
                id_banco,
                status_code,
                mensagem,
                tempo_resposta,
                jsonb_response,
                isError
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

    public async queryDatabaseFindRecords(id_banco: string, startDate: object, endDate: object) {
        return await Records.findAll({
            where: {
                id_banco: id_banco,
                createdAt: {
                    [Op.between]: [startDate, endDate],
                }
            }
        });
    }

    public async findRecordsError(id_banco: string) {
        return await Records.findAll({
            attributes: ['status_code', 'mensagem', 'createdAt'],
            where: {
                id_banco: id_banco,
                isError: true
            },
            order: [['createdAt', 'DESC']], 
            limit: 10 
        });
    }

}
