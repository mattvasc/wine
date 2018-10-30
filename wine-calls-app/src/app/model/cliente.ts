import { Entidade } from "./entidade";

export class Cliente extends Entidade {
	public id?: number;
	public nome_fantasia?: string;
	public razao_social?: string;
	public cpfcpnpj?: string;
	public nome_para_contato?: string;
	public inscricao_estadual?: string;
	public inscricao_municipal?: string;
	public telefones?: string;
	public email?: string;
	public nome_comprador?: string;
	public email_comprador ?: string;
	public data_de_fundacao ?: string;
	public capital_social_atual ?: string;
	public registro_na_junta ?: string;
	public controle_acionario ?: string;
	public numero_de_empregados?: number;
	public ramo_de_atividade ?: string;
	public informacoes_pagamento ?: string;
	public situacao ?: string;
	public observacoes ?: string;
	// public endereco: Endereco;
}
