module.exports = {
  apps: [
    {
      name: 'storage-app',
      script: './dist/main.js',
      exec_mode: 'cluster',
      instances: -1,
      watch: false,
      //   args: ['start'],
      env: {
        NODE_ENV: 'dev',
      },
      env_production: {
        NODE_ENV: 'prod',
      },
    },
  ],
};
// 환경변수 실행하는방법
// pm2 start ecosystem.config.js --env production
