#!/bin/bash
#. /etc/profile

set -e

echo "NODE_ENV=production\nBUILD_PATH='./dist/client'" > .env

yarn
yarn build

cd service
tsc
cd ..

pm2 stop index
pm2 stop node
pm2 start node ./dist/service/index.js

