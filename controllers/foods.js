const express = require("express")
const router = express.Router()

const User = require("../models/user.js")

router.get('/', (req, res) => {
  // const user = req.session.user
  res.render('foods/index.ejs')
  // Add pantry items to index page
  // try inserting the object in the res.render
  // { name: user.username, pantry: user.pantry }
});

router.get("/users/:userId/foods/new", async (req, res) => {
  res.render("new.ejs")
})

router.post("/users/:userId/foods/new", async (req, res) => {
  try {
    const user = req.session.user
    const newFood = req.body
    user.pantry.push(newFood)
    await user.save()
    res.redirect("/users/:userId/foods")
  } catch (error) {
    console.error(error)
    res.redirect("/")
  }
})

module.exports = router