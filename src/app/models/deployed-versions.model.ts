export class DeployedVersions {
  public version: string;
  public date: Date;

  constructor(
    version: string,
    date?: Date,
  ) {
    this.version = version;
    this.date = date;
  }

}
