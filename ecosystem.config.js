module.exports = {
    apps : [
        {
            name: "nuxt-dev",
            script: "npm",
            args: "run dev",
            watch: true,
            autorestart: true,
            max_restarts: 20,
            restart_delay: 1000,
            env: {
              NODE_ENV: 'development'
            {
        }
    ]
}
