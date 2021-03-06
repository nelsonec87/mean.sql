'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy,
	//	User = require('mongoose').model('User');
	db = require('../mysql'),
	User = db.User;

module.exports = function () {
	// Use local strategy
	passport.use(new LocalStrategy({
		usernameField: 'username',
		passwordField: 'password'
	},
		function (username, password, done) {
			User.findOne({
				where: {username: username}
			}).then(function (user) {
					if (!user) {
						return done(null, false, {
							message: 'Unknown user or invalid password'
						});
					}
					if (!user.authenticate(password)) {
						return done(null, false, {
							message: 'Unknown user or invalid password'
						});
					}

					return done(null, user);
				});
		}
		));
};
