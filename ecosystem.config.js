module.exports = {
    apps: [{
        name: 'storage-app',
        script: './dist/main.js',
        // args: 'run start',
        instances: 1,
        exec_mode: 'cluster'
    }]
}