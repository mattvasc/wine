import { Pagamento } from "./pagamento";
import { Endereco } from "./endereco";
export class EmpresaParceira  {
	public static rota: String = "EmpresasParceiras"
	public id?: number;
	public cnpj?: string = "";
	public nome_fantasia?: string = "";
	public razao_social?: string = "";
	public telefones?: string = "";
	public email ?: string = "";
	public endereco_id ?: number;
	public pagamento_id ?: number;
	public status ?: string = "";
	public observacoes ?: string = "";
	public valor_visita_tecnica ?: number;
	public valor_km ?: number;
	public tipo_pessoa ?: string = "";
	public cpf ?: string = "";
	public rg ?: string = "";
	public data_rg ?: string = "";
	public pagamento ?: Pagamento;
	public endereco ?: Endereco;
}
