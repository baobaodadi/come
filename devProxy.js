module.exports = {
    test: {
        '^/assetManager/**': {
            target: 'http://localhost:3001/',
            hostRewrite: 'http://localhost:3001/',
            changeOrigin: true,
            secure: false,
        },
        '^/pub/**': {
            target: 'http://test.oa.sogou-inc.com/',
            hostRewrite: 'http://test.oa.sogou-inc.com/',
            changeOrigin: true,
            secure: false,
        },
    },
//   // prod: {
//   //   '/api/v1/exceptionData/**': {
//   //     target: 'http://10.129.204.157',
//   //     secure: false,
//   //   },
//   // }
};
