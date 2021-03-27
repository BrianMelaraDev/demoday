// document.querySelector('.fa-trash').addEventListener('click', trash)

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