const User = require('./models/user')
const MongoClient = require('mongodb').MongoClient;
module.exports = setupRoutes;

function setupRoutes(app, passport, db) {

  // normal routes ===============================================================

  // show the home page (will also have our login links)
  // app.get('/', isLoggedIn, function (req, res) {
  //   res.render('game.ejs', { gamesPlayed: req.user.gamesPlayed || 0 });
  // });
  app.get('/', function (req, res) {
    res.render('index.ejs', { gamesPlayed: 0 });
  });
  app.get('/indexAcc', isLoggedIn, function (req, res) {
    res.render('indexAcc.ejs', { gamesPlayed: 0 });
  });

  // app.put('/user', isLoggedIn, async function (req, res) {
  //   const gamesPlayed = req.user.gamesPlayed || 0
  //   const user = await User.findById(req.user._id)
  //   user.gamesPlayed = gamesPlayed + 1
  //   const result = await user.save()
  //   res.json({ user: result })
  // });

  // LOGOUT ==============================
  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/profile', isLoggedIn, function(req, res) {
    User.findById(req.user._id).then((user) => {
        res.render('profile.ejs', {
          user : user

        })
      })
  });

  app.get('/builds', isLoggedIn, function(req, res) {
    User.findById(req.user._id).then((user) => {
        res.render('builds.ejs', {
          user : user

        })
        console.log(req.user);
      })
  });
// this code above allows users who are signed in since they already should access to the builds forums only if logged in tho


// app.post('/caption', (req, res) => {
//   db.collection('caption').save({caption: req.body}, (err, result) => {
//     console.log(req.user._id);
//     if (err) return console.log(err)
//     console.log('saved to database')
//     res.redirect('/builds')
//   })
// })
app.post('/caption', isLoggedIn, async function (req, res) {
  const cap = req.body.caption
  // gets name from the ejs with name of caption
  const userCaption = req.user.buildPost
  // gets buildPost object
  userCaption.caption.unshift(cap)
  // userCaption.caption.push(cap)
  console.log(cap);
  console.log(userCaption);
  const user = await User.findById(req.user._id)
  user.buildPost = userCaption
  const result = await user.save()
  // res.json({ user: result })
  .then(result => {
    res.redirect('/builds')
  })
  .catch(error => console.error(error))
});

app.delete('/deletePost',isLoggedIn, async function (req,res){
  // console.log(req.body.caption);
  const cap = req.body.caption
  console.log(req.body.id);
  const userCaption = req.user.buildPost
  // console.log(req.user.buildPost);
  const user = await User.findById(req.user._id)
  User.deleteOne({buildPost:'req.body.caption'},function (err){
    if(err) console.log(err);
    // console.log(User);
    console.log("Successful deletion");
    // console.log(req.user.buildPost);
  })
  // await userCaption.updateOne({_id:buildPost.user},{$pull:{buildPost:buildPost._id}})
  // User.deleteOne({caption: req.body.caption}), function (err){
  //   if (err) return handleError(err)

  // }


})












  // =============================================================================
  // AUTHENTICATE (FIRST LOGIN) ==================================================
  // =============================================================================

  // locally --------------------------------
  // LOGIN ===============================
  // show the login form
  app.get('/login', function (req, res) {
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });

  // process the login form
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/login', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

  // SIGNUP =================================
  // show the signup form
  app.get('/signup', function (req, res) {
    console.log('signupone');
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });

  // process the signup form
  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile', // redirect to the secure profile section
    failureRedirect: '/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
  }));

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login');
}
