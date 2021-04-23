// document.querySelector('.fa-trash').addEventListener('click', trash)
document.querySelectorAll('li').forEach(item =>{
  item.addEventListener('click', event => {
    console.log(item.getAttribute('data'));
    if (item.getAttribute('data')==400 ){
      console.log('joe malon')
      fetch('/computerAPI.json')
        .then(res=>res.json())
        .then(data =>{
          console.log(data.buildCost400[2].brand)
          document.querySelector('.moboBrand').innerText =data.buildCost400[2].brand
          document.querySelector('.moboProduct').innerText =data.buildCost400[2].product

          //first test for retriving data from my own api , will return the word CPU for the type


        })
    }
  })
})
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
$(function() {
  $( "#button" ).click(function() {
    $( "#button" ).addClass( "onclic", 250, validate);
  });

  function validate() {
    setTimeout(function() {
      $( "#button" ).removeClass( "onclic" );
      $( "#button" ).addClass( "validate", 450, callback );
    }, 2250 );
  }
    function callback() {
      setTimeout(function() {
        $( "#button" ).removeClass( "validate" );
      }, 1250 );
    }
  });
// function trash(){
//     console.log("trash is click");
// }
// document.querySelectorAll('.fa-trash').forEach(item => {
//     item.addEventListener('click', event => {

//       console.log(item);
//     })
//   })
// const deleteText = document.querySelectorAll('.fa-trash')
// Array.from(deleteText).forEach((element)=>{
//     element.addEventListener('click',deletePost)
// })
// async function deletePost(){
//     const caption= this.parentNode.childNodes[1].innerText
//     try{
//         const response = await fetch('deletePost',{
//             method:'delete',
//             headers:{'Content0Type':'application/json'},
//             body:JSON.stringify({
//                 'caption':caption
//             })
//         })
//         const data = await response.json()
//         console.log(data);
//         location.reload()
//     }catch(err){
//         console.log(err);
//     }
// }
// let likes = document.querySelector('.fa-heart').addEventListener('click', heart)
// Array.from(thumbUp).forEach(function(element) {
//   //creates an array for element for thumbs up
//       element.addEventListener('click', function(){
//         //for the element we are creating an event Listener of click, so on the clikc of thumbs up

//         const name = this.parentNode.parentNode.childNodes[1].innerText
//         const msg = this.parentNode.parentNode.childNodes[3].innerText
//         const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
//         //these variables are targetting the child
//         fetch('thumbUp', {
//           method: 'put',
//           headers: {'Content-Type': 'application/json'},
//           body: JSON.stringify({
//             'name': name,
//             'msg': msg,
//             'thumbUp':thumbUp
//           })
//         })
//         .then(response => {
//           if (response.ok) return response.json()
//         })
//         .then(data => {
//           console.log(data)
//           window.location.reload(true)
//         })
//       });
// });
// document.querySelector('.fa-trash').addEventListener('click', event => {
//     const caption= this.parentNode.childNodes[1].innerText
//     try{
//         const response = await fetch('deletePost',{
//             method:'delete',
//             headers:{'Content0Type':'application/json'},
//             body:JSON.stringify({
//                 'caption':caption
//             })
//         })
//         const data = await response.json()
//         console.log(data);
//         location.reload()
//     }catch(err){
//         console.log(err);
//     }
//   })
const ul = document.querySelector('#myPosts');
ul.addEventListener('click', deletePost);
function deletePost(e) {
  if (e.target.classList.contains('fa-trash')) {
    var postId = e.target.closest('.post').querySelector('a').getAttribute('href').slice(9);
    fetch('delPost', {
      method: 'delete',
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({ id: postId })
    }).then(() => { window.location.reload() })  
  }
  // console.log(postId);
} 

// document.querySelectorAll('.fa-trash').forEach(item => {
//     item.addEventListener('click', event => {
//         async function deletePost(){
//             const caption= this.parentNode.childNodes[1].innerText
//             try{
//                 const response = await fetch('deletePost',{
//                     method:'delete',
//                     headers:{'Content0Type':'application/json'},
//                     body:JSON.stringify({
//                         'caption':caption
//                     })
//                 })
//                 const data = await response.json()
//                 console.log(data);
//                 location.reload()
//             }catch(err){
//                 console.log(err);
//             }
//         }
//         deletePost()
//     })
//   })
  var trash = document.getElementsByClassName("fa-trash");
  Array.from(trash).forEach(function(element) {
    element.addEventListener('click', function(){
      const name = this.parentNode.parentNode.childNodes[1].innerText
    //   this equals the text
      fetch('deletePost', {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'caption': name
        })
      }).then(function (response) {
        window.location.reload()
      })
    });
});
document.querySelector('.posts').addEventListener('click',loadPosts)
document.querySelector('.saved').addEventListener('click',loadLikes)
document.querySelector('.editProfile').addEventListener('click',editProfile)
function loadLikes(){
  // document.querySelector('.myPosts').innerText= ''

  let saved = document.getElementById('savedBuilds')
  let button = document.getElementById('myPosts')
  let profile = document.getElementById('editProfile')
  if (saved.classList.contains('inactive')){
  
  }else{
    button.classList.toggle('inactive')
    saved.classList.toggle('inactive')
    profile.classList.toggle('inactive')
  
  }
  if(saved.classList.contains('inactive')){
    saved.classList.toggle('inactive')
    if(profile.classList.contains('inactive')){
    }
    else{
      profile.classList.toggle('inactive')

    }
    if(button.classList.contains('inactive')){
    }
    else{
      button.classList.toggle('inactive')

    }
  }

}
function loadPosts(){
  // document.querySelector('.savedBuilds').innerHTML= ''
  let button = document.getElementById('myPosts')
  let saved = document.getElementById('savedBuilds')
  let profile = document.getElementById('editProfile')
  // if(button.classList.contains('inactive')){

  // }else{

  //   saved.classList.toggle('inactive')
  //   button.classList.toggle('inactive')
  //   profile.classList.toggle('inactive')
  // }
  if(button.classList.contains('inactive')){
    button.classList.toggle('inactive')
    if(saved.classList.contains('inactive')){
    }
    else{
      saved.classList.toggle('inactive')

    }
    if(profile.classList.contains('inactive')){
    }
    else{
      profile.classList.toggle('inactive')

    }
  }
}
function editProfile(){
  let button = document.getElementById('myPosts')
  let saved = document.getElementById('savedBuilds')
  let profile = document.getElementById('editProfile')
  if(profile.classList.contains('inactive')){
    profile.classList.toggle('inactive')
    if(saved.classList.contains('inactive')){
    }
    else{
      saved.classList.toggle('inactive')

    }
    if(button.classList.contains('inactive')){
    }
    else{
      button.classList.toggle('inactive')

    }
  }
  // profile.classList.toggle('inactive')

}
// if (button.classList.contains('inactive')){

// }
// else{
//   button.classList.toggle('inactive')

// }
// if ( saved.classList.contains('inactive')){

// }
// else{
//   // button.classList.toggle('inactive')
//   saved.classList.toggle('inactive')

// }