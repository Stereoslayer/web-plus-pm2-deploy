const dotenev = require('dotenv');

dotenev.config({ path: '.env.deploy' });
const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO_USER_NAME,
  DEPLOY_REPO_NAME,
  DEPLOY_FOLDER,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: 'dist/app.js',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: `https://github.com/${DEPLOY_REPO_USER_NAME}/${DEPLOY_REPO_NAME}.git`,
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env* ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': 'cd backend && npm сi && npm run build && pm2 restart ecosystem.config.js',
    },
  },
};
