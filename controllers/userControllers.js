const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const userControllers = {
  signUp: (req, res) => {
    res.render("signUp", {
      title: "Sign Up",
      loggedIn: req.session.loggedIn 
    });
  },
  createNewUser: async (req, res) => {
    const { names, eMail, urlImage, description, adress, password } = req.body;
    const passwordHash = bcryptjs.hashSync(password);
    let newUser = new User({
      names,
      eMail,
      urlImage,
      description,
      adress,
      password: passwordHash
    });
    let userExist = await User.findOne({eMail: eMail });
    try {
      if (userExist) {
        //   console.log(res)
        res.redirect("/signUp")
        throw new Error("No se puede crear una cuenta con este mail");
      } else {
        let userRegistered = await newUser.save();
        console.log("Usuario nuevo")
        res.redirect("/");
      }
    } catch(e) {
        console.log(e)
        res.render("signUp", {
            title: "Sign Up",
            e: e,
          });
    }
  },
  signIn: (req, res) => {
    res.render("signIn", {
      title: "Sign In",
      loggedIn: req.session.loggedIn 
    });
  },
  logIn: async (req, res) => {
    const { eMail, password } = req.body;
    try {
        let userExist = await User.findOne({ eMail: eMail });
        if (!userExist) throw new Error("Username and/or password incorrect!") 
        let passMatch = bcryptjs.compareSync(password, userExist.password);
        if (!passMatch) throw new Error("Username and/or password incorrect!")
        req.session.loggedIn = true
        res.redirect('/')
        console.log("Bienvenido de nuevo");
    } catch (e) {
    console.log(e)
    res.redirect("signIn")
}
  },
    logOut: (req, res) => {
    req.session.destroy(() => {
        res.redirect("/")
      })
    },
}

module.exports = userControllers;
