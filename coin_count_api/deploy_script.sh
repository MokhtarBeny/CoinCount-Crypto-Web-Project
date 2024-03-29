#!/bin/bash

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"

# Check if the PM2 process exists and stop it if it does
if pm2 describe coinCountApi > /dev/null; then
    pm2 delete coinCountApi
fi

# Remove old backup and move current version to backup
rm -rf ~/coin_count_api_old
mv ~/coin_count_api ~/coin_count_api_old

mkdir ~/coin_count_api
tar -xzf ~/coin_count_api.tgz -C ~/coin_count_api
cd ~/coin_count_api

# Log file for deployment inside coin_count_api folder
DEPLOY_LOG="./deploy_logs.txt"

# Record the start time and date of deployment
echo "Deployment started at $(date)" >> $DEPLOY_LOG

npm install | tee npm_install_log.txt

npm run init:env 

npm run build | tee npm_build_log.txt
if [ ${PIPESTATUS[0]} -ne 0 ]; then
    echo "Build failed, check npm_build_log.txt for details."
    exit 1
fi

