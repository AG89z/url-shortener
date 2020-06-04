module.exports = {
  apps : [{
    name: "proxy-server",
    script: './proxy-server/app.js',
  }, {
    name: "api-service",
    script: './api-service/dist/app.js',
  }, {
    name: "gateway-service",
    script: './gateway-service/dist/app.js',
  }],
  // deploy : {
  //   production : {
  //     user : 'SSH_USERNAME',
  //     host : 'SSH_HOSTMACHINE',
  //     ref  : 'origin/master',
  //     repo : 'GIT_REPOSITORY',
  //     path : 'DESTINATION_PATH',
  //     'pre-deploy-local': '',
  //     'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
  //     'pre-setup': ''
  //   }
  // }
};
