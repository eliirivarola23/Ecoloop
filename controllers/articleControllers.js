const Article = require("../models/Article");
const articleControllers = {
	home: (req, res) => {
		res.render("index", {
			title: "Home",
			message: null,
			error: null,
			loggedIn: req.session.loggedIn,
		});
	},
	listItems: async (req, res) => {
		try {
			const articles = await Article.find();
			res.render("listItems", {
				title: "Articles",
				articles,
				error: null,
				loggedIn: req.session.loggedIn,
				user: req.session.user,
			});
		} catch (e) {
			res.redirect("/listItems");
			res.render("listItems", {
				title: "Articles",
				error: e,
			});
		}
	},
	profile: (req, res) => {
		if (req.session.loggedIn) {
			res.render("profile", {
				title: "Profile",
				edit: false,
				error: null,
				loggedIn: req.session.loggedIn,
				user: req.session.user,
			});
		} else {
			res.redirect("/");
		}
	},
	createArticle: async (req, res) => {
		const {
			title,
			image,
			description,
			ubication,
			category,
			contact,
			_id,
			userId,
			userName,
			userUrlImage,
		} = req.body;
		let newArticle;
		if (!_id) {
			newArticle = new Article({
				title,
				image,
				description,
				ubication,
				category,
				contact,
				userId,
				userName,
				userUrlImage,
			});
		} else {
			try {
				newArticle = await Article.findOne({
					_id
				});
				newArticle.title = title;
				newArticle.image = image;
				newArticle.description = description;
				newArticle.ubication = ubication;
				newArticle.category = category;
				newArticle.contact = contact;
			} catch (e) {
				throw new Error(e);
			}
		}
		try {
			await newArticle.save();
			res.redirect("/listItems");
		} catch (e) {
			res.render("profile", {
				title: "Profile",
				message: null,
				error: e.message,
			});
		}
	},
	deleteArticle: async (req, res) => {
		try {
			let article = await Article.findOneAndDelete({
				_id: req.params._id
			});
			res.redirect("/listItems")
		} catch (e) {
			res.render("listItems", {
				title: "Articles",
				error: "There was an error, please try again later",
			});
		}
	},
	editArticle: async (req, res) => {
		try {
			let article = await Article.findOne({
				_id: req.params._id
			});
			if (article) {
				res.render("profile", {
					title: "Edit Article",
					error: null,
					message: "Edited successfully",
					edit: article,
					loggedIn: req.session.loggedIn,
					user: req.session.user,
				});
			} else {
				throw new Error("There was a problem, try again");
			}
		} catch (e) {
			res.render("profile", {
				title: "Edit Article",
				loggedIn: req.session.loggedIn,
				user: req.session.user,
				edit: null,
				message: null,
				error: e.message,
			});
		}
	},
};

module.exports = articleControllers;