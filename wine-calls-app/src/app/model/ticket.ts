
export class Ticket{
	public id?: number;
	/* FKS */
	public client_id?: number;
	public tecnico_id ?: number;
	public endereco_id ?: number;
	/* Fim fks */
	public ticket_client_id ?: string; // nao eh fk
	public data_criacao ?: string;
	public preco_cliente ?: number;
	public preco_tecnico ?: number;
	public ticket_status_id ?: string;
	public data_agendamento ?: string;
	public horario_agendamento ?: string;


	public situacao ?: string;
	public observacoes?: string;
}
