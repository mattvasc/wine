import { Pagamento } from "./pagamento";
import { Endereco } from "./endereco";
export class EmpresaParceira  {
	public static rota: String = "EmpresasParceiras"
	public id?: number;
	public status ?: string = "";
	public tipo_pessoa ?: string = "juridica";
	public cpf ?: string = "";
	public rg ?: string = "";
	public data_rg ?: string = "";
	public cnpj?: string = "";
	public nome_fantasia?: string = "";
	public razao_social?: string = "";
	public telefones?: string = "";
	public nome_contato?: string = "";
	public email ?: string = "";
	public cep ?: number;
	public logradouro?: string;
	public bairro?: string;
	public complemento?: string;
	public cidade?: string;
	public estado?: string;
	public telecom?: number;
	public redes?: number;
	public microinformatica?: number;
	public impressora?: number;
	public locacao_recurso?: number;
	public valor_visita_tecnica ?: number;
	public valor_hora_adicional?: number;
	public valor_km ?: number;
	public agencia ?: string;
    public conta ?: string;
    public nome ?: string;
    public banco ?: string;
    public cpfcnpj ?: string;
    public isPoupanca ?: number;
	public observacoes ?: string = "";
}
