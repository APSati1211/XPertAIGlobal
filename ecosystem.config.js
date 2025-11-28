module.exports = {
  apps: [{
    name: 'frontend',
    cwd: '/root/XPertAIGlobal',
    script: 'npm',
    args: 'run serve',
    watch: false,
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    }
  }]
}
