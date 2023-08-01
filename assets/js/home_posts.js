{
    // method to submit post data using ajax
    let createPost = function() {
            let newPostForm = $("#new-post-form"); //created a veriable to get form data

            newPostForm.submit(function(e) { // function to prevent submit the way html does
                e.preventDefault();

                $.ajax({ // setting up ajax for the page
                    type: 'post',
                    url: '/posts/create/',
                    data: newPostForm.serialize(),
                    success: function(data) {
                        let newPost = newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost).fadeIn('slow');
                    },
                    error: function(error) {
                        console.log(error.responseText);
                    }
                })
            });
        }
        // method to create a post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${ post._id }">
            <p>
                
                    <small>
                    <a class="delete-post-button" href="/posts/destroy/${post.id } ">X</a>
                </small>
                    
                        ${post.content}   <br>
                            <small>
        ${post.user.name} 
        </small></p>
            <div class="post-comments">
                <!-- comments shown to only signed in users -->
                
                    <form action="/comments/create" method="post">
                        <input type="text" name="content" placeholder="Add a comment.." required>
                        <input type="hidden" name="post" value="${post._id }">
                        <input type="submit" value="Add Comment">
                    </form>
        
        
                    
                        <div class="post-comments-list">
                            <ul id="post-comments-${post._id } ">
                    
                            </ul>
                        </div>
            </div>
        
        </li>`)
    }

    createPost();

}