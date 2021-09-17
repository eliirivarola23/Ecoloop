
const Article = require("../models/Article");
const articleControllers = {
    home: (req, res) =>{
        res.render("index", {
            title: "Home",
            error: null,
            loggedIn: req.session.loggedIn 
        })
    },
    listItems: async (req, res) =>{
      try {
        const articles = await Article.find()
        res.render("listItems", {
            title: "Articles",
            articles,
            error: null,
            loggedIn: req.session.loggedIn,
            user: req.session.user 
 
        })
        // console.log(req.session.user)
      }catch(e) {
          console.log(e)
      }
    },
    profile: async(req, res) =>{
        if(req.session.loggedIn) {
            res.render("profile", {
                title: "Profile",
                edit: false,
                error: null,
                loggedIn: req.session.loggedIn,
                user: req.session.user 
            })
        } else {
            res.redirect("/")
        }
    },
    createArticle: async (req,res) => {
        console.log(req.body)
        const {
            title,
            image,
            description,
            ubication,
            category,
            contact,
            _id,
            userId
        } = req.body
        let newArticle;
        if(!_id) {
            newArticle = new Article({
               title,
               image,
               description,
               ubication,
               category,
               contact,
                userId
           })
        } else {
            newArticle = await Article.findOne({_id})
            newArticle.title = title
            newArticle.image = image
            newArticle.description = description
            newArticle.ubication = ubication
            newArticle.category = category
            newArticle.contact = contact
        }
        try {
           await newArticle.save()
           console.log("¡Un nuevo Articulo!")
            res.redirect("/listItems")
        } catch(e) {
            console.log(e)
        }
    },
    deleteArticle: async(req, res) => {
        await Article.findOneAndDelete({_id: req.params._id})
        loggedIn: req.session.loggedIn 
        res.redirect("/listItems")
    },
    editArticle: async(req, res) => {
        let article = await Article.findOne({_id: req.params._id})
        res.render("profile", {
            title: "Edit Article",
            error: null,
            edit: article,
            loggedIn: req.session.loggedIn,
            user:  req.session.user  
        })
    }
}

module.exports = articleControllers