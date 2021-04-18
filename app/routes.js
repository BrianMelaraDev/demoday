const { ObjectId } = require("bson");


module.exports = function(app, passport, db, ObjectID, multer, storage , upload) {
//exports the whole function to be used in the rserver.js file with the required parameters
// normal routes ===============================================================
//CRUD CREATE READ UPDATE DELETE
 //GET fetches a single resource-Part of Read in CRUD
 //PUT  update/create
 //POST create/update
 //DELETE deletes from db
 //req-REQUEST
 //res -RESPONSE
    // show the home page (will also have our login links)
    //first page that will show up
    app.get('/', function(req, res) {
        res.render('index.ejs');
        //the res will render the index.ejs file
    });
    app.get('/indexAcc', isLoggedIn,function(req, res) {
      res.render('indexAcc.ejs');
      //the res will render the index.ejs file
  });
    // PROFILE SECTION =========================
    app.get('/profile', isLoggedIn, function(req, res) {
      //checks to see if user is logged it to run the function
      let uId = ObjectId(req.session.passport.user)
      console.log("User Name:",req.user.local.userName);
      // console.log(uId);
        db.collection('buildPost').find({'postID': uId}).sort({ _id: -1}).toArray((err, result) => {
          //get out data base to the messages collection and find the whole collection and make it into an array to access it 
          if (err) return console.log(err)
          // console.log("this is the result",result);
          res.render('profile.ejs', {
            //res.render complies our templates and create a HTML output
            //the response if user is logged in , the profile ejs will be renderd with the users information
            // after passing auth it invokes req.user property that sets that user information
            userPost: result
            //this is the users information that will be rendered to the profile ejs
          })
        })
    });
//     app.get('/builds', isLoggedIn, function(req, res) {
//   // console.log(req.user.userName);
//   // let uId = ObjectId(req.session.passport.user)
//   // let userEmail = req.user.local.email
//   // console.log("this is the request", req.user.local.email)
//   db.collection('comments').find().sort({ _id: -1}).toArray((err, result) => {
//     console.log('this is my comment result',result);
//     // console.log("this is the response",result)
//     if (err) return console.log(err)
//     res.render('builds.ejs',{
//       comment:result
//     })
//   })
// });
    app.get('/builds', isLoggedIn, function(req, res) {
      // console.log(req.user.userName);
      // let uId = ObjectId(req.session.passport.user)
      // let userEmail = req.user.local.email
      // console.log("this is the request", req.user.local.email)
      db.collection('buildPost').find().sort({ _id: -1}).toArray((err, result) => {
        db.collection('comments').find().sort({ _id: -1}).toArray((err, result1) => {
          // const mappedPosts = [];
          // // console.log("this is the first result", result);
          // // console.log("second data", result1);
          //   result.forEach((post) => {
          //     const match = result1.find((comment) => comment.postID == post._id)
          //     if(match) {
          //        mappedPosts.push({post:post,
          //        comments: match})
          //     }
          //   })
          //     console.log(mappedPosts)

            // console.log("filtered posts", posts);
        
          if (err) return console.log(err)
          // console.log(result1[0].postID);
          res.render('builds.ejs',{
            comments:result1,
            buildPost:result,
            userName:req.user.local.userName

          })

        })
        if (err) return console.log(err)
        // console.log('this is my result',result[0].userIMG.filename);
        // console.log("User Name:",req.user.local.userName);
        // res.render('builds.ejs',{
          
        //   buildPost:result,
        //   userName:req.user.local.userName
        // })
      })
    });
    // app.get('/builds',isLoggedIn, function(req, res){

    app.get('/post', function(req,res){
      console.log(req.query.id);
      let postId =  ObjectID(req.query.id)
      db.collection('buildPost').find({_id: postId}).toArray((err, result) =>{
        db.collection('comments').find({postID:postId}).sort({ _id: -1}).toArray((err, result1) => {
          // console.log(result1);
          if (err) return console.log(err)
          res.render('post.ejs', {
            buildPost:result,
            comments:result1,
            userName:req.user.local.userName
          })

        })
      // res.render('builds.ejs')

      }) 
    })


    // })

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        //will log user out and redirect to index page
        req.logout();
        res.redirect('/');
    });

// message board routes ===============================================================
    // express will create a message in thr database and save it as a object that contains the inforamtion in the save()
    app.post('/submissionPost', (req, res) => { 
      upload(req,res, (err) => {
        if(err) {
          res.render('builds',{
            msg:err
          })
          // console.log("file upload fail", err);
        }else {
          if(req.file == undefined){
            res.render('index', {
              msg: 'Error: No File Selected!'
            });
          } else{

            // console.log("success", req.file);
          
            let uId = ObjectId(req.session.passport.user)
            db.collection('buildPost').save({caption: req.body.caption, postID:uId, userIMG:req.file, userName: req.user.local.userName}, (err, result) => {
              //return err
              if (err) return console.log(err)
              console.log('saved to database')
            //   //will log if information is saved
            console.log('this is my post ID',result.ops[0].postID);
              // db.collection('comments').save({postId:result.ops[0]._id}, (err, result) =>{
              //   if (err) return console.log(err)
              //   console.log('created a document in comments');
              // })
              res.redirect('/builds')
              // refreshes the page to see the new data , update the page 
            })
          }
          // console.log(req);
        }
      })
    })
app.post('/commentPost/:id', (req, res) =>{
  let postId= ObjectId(req.params.id)
  let uId = ObjectId(req.session.passport.user)
  // db.collection('buildPost').find()
  // // db.collection('comments').save({})
  // console.log('this is the post id from commentpost',postId);
  // console.log('this is the comment made', req.body.comment);
  // console.log('this is the poster ID', req.user._id);
  // console.log('this is the poster username', req.user.local.userName);
  db.collection('comments').save({postID: postId, posterId:req.user._id, comment:req.body.comment, commentName: req.user.local.userName }, (err, result) =>{
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/builds')
  } )

})

app.delete('/delPost', (req,res) =>{
  console.log(req.body.id);
  db.collection('buildPost').findOneAndDelete({_id: ObjectId(req.body.id)}, (err, result) => {
      // db.collection('comments').deleteMany({postID})
    if (err) return res.send(500, err)
    res.send('Message deleted!')
  })



})



    //UPDATE thumbs up
    // app.put('/thumbUp', (req, res) => {
    //   db.collection('messages')
    //   //fetches the messages collection in our db
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     //find one and update is a mongoose method, finds the first document that matches a given filter
    //     $set: {
    //       //operator that replaces the value of a field with another specified value
    //       thumbUp:req.body.thumbUp + 1
    //       //looks up thumbUp and req.body.thumbUp +1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     //sorts all input documents and returns them to pipeline and returns in sorted order.
    //     //looks at the last item and changes from there
    //     //-1 is decending
    //     upsert: true
    //     //upsert - update is true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     //send result
    //     res.send(result)
    //   })
    // })
    // app.put('/thumbDown', (req, res) => {
    //   db.collection('messages')
    //   .findOneAndUpdate({name: req.body.name, msg: req.body.msg}, {
    //     $set: {
    //       thumbDown:req.body.thumbDown + 1
    //     }
    //   }, {
    //     sort: {_id: -1},
    //     upsert: true
    //   }, (err, result) => {
    //     if (err) return res.send(err)
    //     res.send(result)
    //   })
    // })

    // app.delete('/messages', (req, res) => {
    //   // /messages is fetched from the main.js to get out req which will deterimine what we will delete
    //   db.collection('messages').findOneAndDelete({name: req.body.name, msg: req.body.msg}, (err, result) => {

    //     if (err) return res.send(500, err)
    //     res.send('Message deleted!')
    //   })
    // })

// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

    // locally --------------------------------
        // LOGIN ===============================
        // show the login form
        app.get('/login', function(req, res) {
            res.render('login.ejs', { message: req.flash('loginMessage') });
        });

        // process the login form
        
        app.post('/login', passport.authenticate('local-login', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

        // SIGNUP =================================
        // show the signup form
        app.get('/signup', function(req, res) {
            res.render('signup.ejs', { message: req.flash('signupMessage') });
        });

        
        // process the signup form
        //local-signup is the method that passes returns the data
        app.post('/signup', passport.authenticate('local-signup', {
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages
        }));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

    // local -----------------------------------
    app.get('/unlink/local', isLoggedIn, function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            res.redirect('/profile');
        });
    });

};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
