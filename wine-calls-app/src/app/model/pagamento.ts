export class Pagamento {
    public id ?: number;
    public agencia ?: string;
    public conta ?: string;
    public banco ?: string;
    public nome ?: string;
    public cpfcnpj ?: string;
    public isPoupanca ?: number;
    public isPJ ?: number = 0;
    public operacao ?: string;
}
