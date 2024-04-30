const dotenv = require('dotenv');

dotenv.config({ path: './.env.deploy' });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO_USER_NAME,
  DEPLOY_REPO_NAME,
} = process.env;

module.exports = {
  apps: [
    {
      name: "frontend",
      script : './build/index.html',
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: `https://github.com/${DEPLOY_REPO_USER_NAME}/${DEPLOY_REPO_NAME}.git`,
      path: DEPLOY_PATH,
      ssh_options: "StrictHostKeyChecking=no",
      "post-deploy":
          `cd ~/web-plus-pm2-deploy/source/frontend/ && npm i && npm run build`,
    },
  },
};