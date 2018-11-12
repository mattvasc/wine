
export class Ticket{
	public id?: number;
	public client_id?: number;
	public ticket_client_id ?: string; // nao eh fk
	public data_criacao ?: string;
	public email_contato ?: string;
	public cep ?: number;
	public logradouro?: string;
	public bairro?: string;
	public complemento?: string;
	public cidade?: string;
	public estado?: string;
	public nome_contato ?: string;
	public telefone_contato?: string;
	public tipo_ticket ?: string;
	public categoria_ticket?: string;
	public sub_categoria_ticket?: string;
	public ticket_status_id ?: string;
	public assunto_problema?: string;
	public defeito_informado?: string;
	public defeito_contastado?: string;
	public solucao?: string;
	public tecnico_id ?: number;
	public data_inicio ?: string;
	public data_fim ?: string;
	public check_docs ?: string;
	public preco_cliente ?: number;
	public preco_tecnico ?: number;
	public observacoes ?: string;
	public atendimento_faturado_cliente?: boolean;
	public atendimento_faturado_parceiro?: boolean;
}
