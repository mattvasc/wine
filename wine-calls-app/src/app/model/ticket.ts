import {Cliente} from "./cliente";
import {Tecnico} from "./tecnico";
import {EmpresaParceira} from "./empresa-parceira";

export class Ticket {
	public ticket_id?: number;
	/* FKS */
	public cliente_id?: number;
	public tecnico_id?: number;
	/* Fim fks */

	public ticket_client_id?: string; // nao eh fk
	public data_criacao?: string;
	public preco_cliente?: number;
	public preco_tecnico?: number;
	public ticket_status?: string;
	/*
        aberto
        agendado
        em-atendimento
        entregue
        encerrado-com-sucesso
        encerrado-com-insucesso
        cancelado
      */
	public data_inicio?: string;
	public data_fim?: string;
	public observacoes?: string;
	public nome_contato?: string;
	public tipo_ticket?: string; // Categoria do ticket
	public email_contato?: string;

	public check_docs?: string;
	public check_pgto_cliente?: string;
	public check_pgto_tecnico?: string;

	public estagio?: number = 0;

	//endereco
	public cep?: string = '';
	public logradouro?: string = "";
	public logradouro_numero?: string = "";
	public complemento?: string = "";
	public cidade?: string = '';
	public estado?: string = '';
	public bairro?: string = "";

	public cliente?: Cliente;
	public tecnico?: Tecnico;
	public empresa?: EmpresaParceira;

}
