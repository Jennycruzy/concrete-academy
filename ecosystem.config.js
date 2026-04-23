module.exports = {
  apps: [{
    name: 'concrete-academy',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/concrete-academy',
    env: {
      NODE_ENV: 'production',
      PORT: 3003,
    },
  }],
};
