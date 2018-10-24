var travconfig = {
    // other things
 
    customLaunchers: {
        Chrome_travis_ci: {
            base: 'Chrome',
            flags: ['--no-sandbox']
        }
    },
};
 
if (process.env.TRAVIS) {
    travconfig.browsers = ['Chrome_travis_ci'];
}
 
config.set(travconfig);