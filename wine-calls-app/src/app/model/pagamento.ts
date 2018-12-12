export class Pagamento {
    public id ?: number;
    public agencia ?: string;
    public conta ?: string;
    public banco ?: string;
    public nome_titular ?: string;
    public cpfcnpj ?: string;
    public isPoupanca ?: number;
    public ispj ?: number = 0;
    public operacao ?: string;
}
