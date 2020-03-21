export class Dialog {

  public titulo: string;
  public texto: string;
  public hint?: string;
  public textarea?: boolean;
  public textareaLabel?: string;
  public textareaValue?: string; // usado tanto para levar quanto para trazer o retorno
  public textareaRequired?: boolean;
  public textareaRequiredErrorText?: string;
  public disableClose: boolean;
  public botoes?: DialogButton[];

}

export class DialogButton {

  public texto: string;
  public retorno?: any;
  public order?: number;
  public class?: string;

}
