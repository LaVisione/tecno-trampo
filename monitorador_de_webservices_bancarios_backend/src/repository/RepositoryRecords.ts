import { Registros } from "../models/Records";

export class RepositoryRecords {

    public async saveRecords(id_banco: number, status_code: string, mensagem: string, tempo_resposta: number, jsonb_response: object) {
        try {
            await Registros.create({
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
}
