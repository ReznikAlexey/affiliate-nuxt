import {config} from 'dotenv'

config()

export const apps = [
    {
        name: 'affiliate',
        port: '3000',
        exec_mode: 'cluster',
        instances: 'max',
        script: './.output/server/index.mjs'
    }
]