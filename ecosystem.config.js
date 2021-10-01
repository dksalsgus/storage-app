module.exports = {
    apps: [{
        name: "storage-app",
        script: "npm",
        args: "start",
        instances: 0,
        exec_mode: 'cluster'
    }]
}