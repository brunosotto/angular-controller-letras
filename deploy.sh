#!/bin/bash

# exclui a pasta de destino
rm -R ../express-service-letras/src/public/controller

# build
echo 'buildando'
ng build
echo 'build finalizado'

# move
mv dist ../express-service-letras/src/public/controller
echo 'deploy finalizado'
