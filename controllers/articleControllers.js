const Article = require("../models/Article");
const articleControllers = {
	home: (req, res) => {
		res.render("index", {
			title: "Home",
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
				title: "Article",
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
			console.log("¡Un nuevo Articulo!");
			res.redirect("/listItems");
		} catch (e) {
			console.log(e);
		}
	},
	deleteArticle: async (req, res) => {
		try {
			let article = await Article.findOneAndDelete({
				_id: req.params._id
			});
			if (article) {
				res.render("listItems", {
					title: "Article",
					loggedIn: req.session.loggedIn,
					message: "Item deleted successfully",
				});
			} else {
				throw new Error();
			}
		} catch (e) {
			res.redirect("/listItems");
			res.render("profile", {
				title: "Article",
				error: e,
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
					edit: article,
					loggedIn: req.session.loggedIn,
					user: req.session.user,
				});
			} else {
				throw new Error();
			}
		} catch (e) {
			res.redirect("/listItems");
			res.render("profile", {
				title: "Edit Article",
				error: e,
			});
		}
	},
};

module.exports = articleControllers;