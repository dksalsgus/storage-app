module.exports = {
    apps: [{
        name: "storage-app",
        script: "npm",
        exec_mode: 'cluster',
        instances: 1,
        args: ['start'],
        env: {
            NODE_ENV: "dev",
        },
        env_production: {
            NODE_ENV: "prod",
        }
    }]
}