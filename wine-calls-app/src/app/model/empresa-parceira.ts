
export class EmpresaParceira  {
	public static rota: String = "EmpresasParceiras"
	public id?: number;
	public status ?: string = "";
	public ispj ?: number = 1;
	public cnpj?: string = "";
	public cpf ?: string = "";
	public rg ?: string = "";
	public nome_fantasia?: string = "";
	public razao_social?: string = "";
	public telefones?: string = "";
	public nome_contato?: string = "";
	public email ?: string = "";

	//endereco
	public cep ?: string = '';
    public logradouro ?: string  ="";
    public numero ?: string = "";
    public complemento ?: string ="";
    public municipio ?: string = '';
    public estado ?: string = '';
    public bairro ?: string ="";

	//Valores
	public valor_visita_tecnica ?: number;
	public valor_hora_adicional ?: number;
	public valor_km ?: number;

	//Pagamento
    public pgto_agencia ?: string;
    public pgto_conta ?: string;
    public pgto_banco ?: string;
    public pgto_nome_titular ?: string;
    public pgto_cpfcnpj ?: string;
	public pgto_isPoupanca ?: number;
	
	public observacoes ?: string = "";

}
