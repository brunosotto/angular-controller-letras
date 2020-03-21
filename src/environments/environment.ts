export const environment = {
  production: false,
  user: {
    info: './api/user-info'
  },
  project: {
    list_projects: './api/projects',
    get_project: './api/project/{id}',
    delete_project: './api/project/{id}',
    insert_project: './api/project',
    update_project: './api/project/{id}',
  },
  deploy: {
    run: './api/run-deploy'
  }
};
