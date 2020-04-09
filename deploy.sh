#!/bin/bash

# exclui a pasta de destino
rm -R ../express-service-letras/angular-controller

# build
echo 'buildando'
ng build
echo 'build finalizado'

# move
mv dist ../express-service-letras/angular-controller
echo 'deploy finalizado'
