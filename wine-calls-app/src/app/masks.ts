export class Masks {
  public static CEP = [ /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/];
  public static CNPJ = [/\d/,/\d/,'\.',/\d/,/\d/,/\d/,'\.', /\d/,/\d/,/\d/,'\/',/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,];
  public static CPF = [/\d/,/\d/,/\d/,'\.',/\d/,/\d/,/\d/,'\.',/\d/,/\d/,/\d/,'-',/\d/,/\d/];
  public static DATE = [/\d/,/\d/,'\/',/\d/,/\d/,'\/',/\d/,/\d/,/\d/,/\d/,];
}
