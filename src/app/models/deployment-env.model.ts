import { DeployedVersions } from './deployed-versions.model';

export class DeploymentEnv {

  public name: string;
  public port: number;
  public lastDeploy: Date;
  public lastLog: string;
  public versions: DeployedVersions[];

  constructor(
    name: string,
    port: number,
    lastDeploy: Date,
    lastLog: string,
    versions: DeployedVersions[],
  ) {
    this.name = name;
    this.port = port;
    this.lastDeploy = lastDeploy;
    this.lastLog = lastLog;
    this.versions = versions;
  }

}
