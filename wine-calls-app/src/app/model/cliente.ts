
export class Cliente {
	public id?: number;
	public status?: string;

	public razao_social?: string;
	public nome_fantasia?: string;
	public cnpj?: string;
	public inscricao_estadual?: string;
	public ramo_de_atividade?: string;

	//endereco
	public cep?: string = '';
	public logradouro?: string = "";
	public logradouro_numero?: string = "";
	public complemento?: string = "";
	public municipio?: string = '';
	public estado?: string = '';
	public bairro?: string = "";

	public nome_para_contato?: string;
	public telefones?: string;
	public email?: string;
	public observacoes?: string;

}
