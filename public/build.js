// const section = document.querySelector('#postSection')
// section.addEventListener('click', updateLike)
// function updateLike(e){
//   if(e.target.classList.contains('fa-heart')){
//     var postId = e.target.closest('.postDiv').querySelector('a').getAttribute('href').slice(9);
//     fetch('updateLike',{
//         method:'put',
//         headers: {'Content-Type' : 'application/json'},
//         body: JSON.stringify({ id: postId })
//     }).then(() => { window.location.reload() }) 

//   }
// }
let likes = document.getElementsByClassName('fa-heart')
Array.from(likes).forEach(function(element) {
    //creates an array for element for thumbs up
        element.addEventListener('click', function(){
          //for the element we are creating an event Listener of click, so on the clikc of thumbs up
          var postId = element.closest('.postDiv').querySelector('a').getAttribute('href').slice(9);
          let likes = parseFloat(element.closest('.postDiv').querySelector('i').getAttribute('data'))
        //   console.log('this is the likes number',likes);
        //   const name = this.parentNode.parentNode.childNodes[1].innerText
        //   const msg = this.parentNode.parentNode.childNodes[3].innerText
        //   const thumbUp = parseFloat(this.parentNode.parentNode.childNodes[5].innerText)
          //these variables are targetting the child
          fetch('updateLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'postId': postId,
              'likes':likes
            })
          })
          .then(response => {
            if (response.ok) return response.json()
          })
          .then(data => {
            console.log(data)
            window.location.reload(true)
          })
        });
  });
  