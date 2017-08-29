#!/bin/bash
case $NODE_ENV in
    production )
        npm start
        ;;
    development )
        npm run watch
        ;;
    * )
        npm run watch
        ;;
esac
