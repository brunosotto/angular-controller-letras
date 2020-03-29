export const environment = {
  production: false,
  config: './api/configs',
  text: './api/text',
  user: {
    info: './api/user-info'
  },
  louvor: {
    list_louvores: './api/louvores',
    get_louvor: './api/louvor/{id}',
    delete_louvor: './api/louvor/{id}',
    insert_louvor: './api/louvor',
    update_louvor: './api/louvor/{id}',
  },
  deploy: {
    run: './api/run-deploy'
  }
};
