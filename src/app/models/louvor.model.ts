export class Louvor {

  public id: string;
  public name: string;
  public text: string;
  public arr: string[];

  constructor(
    id: string,
    name: string,
    text: string,
    arr: string[],
  ) {
    this.id = id;
    this.name = name;
    this.text = text;
    this.arr = arr;
  }

}
