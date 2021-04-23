const mapPostsAndComments = (posts, comments) => {
    const mappedPosts = [];
    posts.forEach((post) => {
    const match = comments.filter((comment) => comment.postID.toString() === post._id.toString())
    if(match) {
        mappedPosts.push({post:post,
            comments: match})
    }
})
    return mappedPosts
    // console.log("mapped posts", mappedPosts)
}

exports.mapPostsAndComments = mapPostsAndComments