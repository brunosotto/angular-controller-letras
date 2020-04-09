#!/bin/bash

# exclui a public local
rm -R ./public

# exclui a public lá
ssh root@clicaaki.com 'rm /root/projects/production/express-service-missao/public/ -R'
echo 'excluído a public'

# build
echo 'buildando'
ng build
echo 'build finalizado'

# copy
mv dist public
scp -r ./public root@clicaaki.com:/root/projects/production/express-service-missao/public
echo 'deploy finalizado'

# exclui a public local
rm -R ./public
