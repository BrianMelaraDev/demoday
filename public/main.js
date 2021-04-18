// document.querySelector('.fa-trash').addEventListener('click', trash)
document.querySelectorAll('li').forEach(item =>{
  item.addEventListener('click', event => {
    console.log(item.getAttribute('data'));
    if (item.getAttribute('data')==400 ){
      console.log('joe malon')
      fetch('/computerAPI.json')
        .then(res=>res.json())
        .then(data =>{
          console.log(data)
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
  console.log(postId);
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