import { DeploymentEnv } from './deployment-env.model';

export class Project {

  public id: string;
  public name: string;
  public enable: boolean;
  public script: string;
  public deploymentPath: string;
  public lastRun: Date;
  public deploymentEnvs: DeploymentEnv[];
  public githubRepoUrl: string;
  public authToken?: string;

  constructor(
    id: string,
    name: string,
    enable: boolean,
    script: string,
    deploymentPath: string,
    lastRun: Date,
    deploymentEnvs: DeploymentEnv[],
    githubRepoUrl: string,
    authToken?: string
  ) {
    this.id = id;
    this.name = name;
    this.enable = enable;
    this.script = script;
    this.deploymentPath = deploymentPath;
    this.lastRun = lastRun;
    this.deploymentEnvs = deploymentEnvs;
    this.githubRepoUrl = githubRepoUrl;
    this.authToken = authToken;
  }

}
