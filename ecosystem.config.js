module.exports = {
    apps: [
      {
        name: 'Affiliate',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
      }
    ]
  }