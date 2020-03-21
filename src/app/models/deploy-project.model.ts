export class DeployProject {
  public projectId: string;
  public environment: string;
  public branch: string;

  constructor(
    projectId: string,
    environment: string,
    branch: string
  ) {
    this.projectId = projectId;
    this.environment = environment;
    this.branch = branch;
  }

}
