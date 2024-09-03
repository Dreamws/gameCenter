/**
 * 静态资源服务，用于预览 dist 目录
 * node 运行
 */

const liveServer = require('live-server')

const params = {
  port: 9091,
  host: '0.0.0.0',
  root: 'dist',
  file: 'index.html', // When set, serve this file (server root relative) for every 404 (useful for single-page applications)
  proxy: [['/hk', 'https://itunes.apple.com']],
}

liveServer.start(params)
