const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const userControllers = {
	signUp: (req, res) => {
		if (!req.session.loggedIn) {
			res.render("signUp", {
				title: "Sign Up",
				loggedIn: req.session.loggedIn,
				user: req.session.user,
				error: null,
			});
		} else {
			res.redirect("/");
		}
	},
	createNewUser: async (req, res) => {
		const {
			names,
			eMail,
			urlImage,
			description,
			address,
			password
		} = req.body;
		const passwordHash = bcryptjs.hashSync(password);
		let newUser = new User({
			names,
			eMail,
			urlImage,
			description,
			address,
			password: passwordHash,
		});
		try {
			let userExist = await User.findOne({
				eMail: eMail
			});
			if (userExist) {
				throw new Error("Email already exists");
			} else {
				let userRegistered = await newUser.save()
				res.redirect("/signIn")
			}
		} catch (error) {
			res.render("signUp", {
				title: "Sign Up",
				loggedIn: req.session.loggedIn,
				error: error.message,
			});
		}
	},
	signIn: (req, res) => {
		if (!req.session.loggedIn) {
			res.render("signIn", {
				title: "Sign In",
				loggedIn: req.session.loggedIn,
				user: req.session.user,
				error: null,
				message: null
			});
		} else {
			res.redirect("/");
		}
	},
	logIn: async (req, res) => {
		const {
			eMail,
			password
		} = req.body;
		try {
			let userExist = await User.findOne({
				eMail: eMail
			});
			if (!userExist) throw new Error
			let passMatch = bcryptjs.compareSync(password, userExist.password);
			if (!passMatch) throw new Error;
			req.session.loggedIn = true;
			req.session.user = {
				_id: userExist._id,
				urlImage: userExist.urlImage,
				names: userExist.names,
			};
			res.redirect("/")
		} catch (e) {
			res.render("signIn", {
				title: "Sign In",
				loggedIn: req.session.loggedIn,
				user: req.session.user,
				error: e,
				message: null
			});
		}
	},
	logOut: (req, res) => {
		req.session.destroy(() => {
			res.redirect("/");
		});
	},
};

module.exports = userControllers;