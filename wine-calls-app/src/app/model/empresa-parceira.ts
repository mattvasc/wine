import { Entidade } from "./entidade";

export class EmpresaParceira extends Entidade {
	public static rota: String = "EmpresasParceiras"
	public id?: number;
	public cnpj?: string;
	public nome_fantasia?: string;
	public razao_social?: string;
	public nome_para_contato ?: string;
	public telefones?: string;
	public email ?: string;
	public endereco_id ?: number;
	public pagamento_id ?: number;
	public situacao ?: string;
	public observacoes ?: string;
}
