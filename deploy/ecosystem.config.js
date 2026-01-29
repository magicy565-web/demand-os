module.exports = {
  apps: [
    {
      name: 'demand-frontend',
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      cwd: '/var/www/demand-os/frontend',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: '/var/log/demand-os/frontend-error.log',
      out_file: '/var/log/demand-os/frontend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '500M',
      restart_delay: 3000,
      max_restarts: 10,
      autorestart: true,
      watch: false,
    },
    {
      name: 'demand-agent',
      script: 'npx',
      args: 'tsx listening-agent.ts',
      cwd: '/var/www/demand-os/scripts',
      instances: 1,
      exec_mode: 'fork',
      env: {
        NODE_ENV: 'production',
      },
      error_file: '/var/log/demand-os/agent-error.log',
      out_file: '/var/log/demand-os/agent-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      max_memory_restart: '200M',
      restart_delay: 5000,
      max_restarts: 5,
      autorestart: true,
      watch: false,
      cron_restart: '0 */6 * * *', // 每6小时重启一次
    },
  ],
};
