// Start this app from your command line with: node hellovalidate.js
// then visit: http://localhost:3000/YOURNAME

var Hapi = require('hapi'),
    Joi  = require('joi'),
    Boom = require('boom');

var server = new Hapi.Server('0.0.0.0', 3000);

server.route({
    method: 'GET',
    path: '/{yourname*}',
    config: {  // validate will ensure YOURNAME is valid before replying to your request
        validate: { params: { yourname: Joi.string().max(40).min(2).alphanum() } },
        handler: function (req,reply) {
            reply('Hello '+ req.params.yourname + '!');
        }
    }
});

server.route({
  	method: 'GET',
  	path: '/photo/{id*}',
  	config: {  // validate will ensure YOURNAME is valid before replying to your request
    	validate: { params: { id: Joi.string().max(40).min(2).alphanum() } },
    	handler: function (req,reply) {
        	// until we implement authentication we are simply returning a 401:
        	reply(Boom.unauthorized('Please log-in to see that'));
        	// the key here is our use of the Boom.unauthorised method.
    	}
  	}
});


server.start(function() {
    console.log('Now Visit: http://localhost:3000/YOURNAME')
});

module.exports = server;