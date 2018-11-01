
export class Ticket{
	public id?: number;
	/* FKS */
	public client_id?: number;
	public tecnico_id ?: number;
	public endereco_contato_id ?: number;
	/* Fim fks */
	
	public ticket_client_id ?: string; // nao eh fk
	public data_criacao ?: string;
	public preco_cliente ?: number;
	public preco_tecnico ?: number;
	public ticket_status_id ?: string;
	public data_inicio ?: string;
	public data_fim ?: string;
	public observacoes ?: string;
	public nome_contato ?: string;
	public tipo_ticket ?: string;
	public email_contato ?: string;
	
	public check_docs ?: string;
	public check_pgto_cliente ?: string;
	public check_pgto_tecnico ?: string;

}
