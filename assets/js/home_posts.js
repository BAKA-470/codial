{
    // method to submit post data using ajax
    let createPost = function() {
            let newPostForm = $("#new-post-form"); //created a veriable to get form data

            newPostForm.submit(function(e) { // function to prevent submit the way html does
                e.preventDefault();

                $.ajax({ // setting up ajax for the page
                    type: 'post',
                    url: '/posts/create',
                    data: newPostForm.serialize(),
                    success: function(data) {
                        let newPost = newPostDom(data.data.post);
                        $('#posts-list-container>ul').prepend(newPost).fadeIn('slow');
                        newPostForm.trigger('reset');

                        deletePost($('.delete-post-button', newPost));
                        new Noty({
                            theme: 'nest',
                            text: 'Post Created!!!',
                            type: 'success',
                            layout: 'topLeft',
                            timeout: 1500,
                        }).show();
                    },
                    error: function(error) {
                        console.log(error.responseText);
                        new Noty({
                            theme: 'nest',
                            text: 'Failed to create post.',
                            type: 'error',
                            layout: 'topLeft',
                            timeout: 1500, // 3 seconds
                        }).show();
                    }
                })
            });
        }
        // method to create a post in DOM
    let newPostDom = function(post) {
        return $(`<li id="post-${ post._id }">
            <p>
                
                    <small>
                    <a class="delete-post-button" href="/posts/destroy/${post._id } ">X</a>
                </small>
                    
                ${(post.content)}   <br>
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



    //method to delete a post from DOM with ajax
    let deletePost = function() {
        $('#posts-list-container').on('click', '.delete-post-button', function(e) {
            e.preventDefault();
            let deleteLink = $(this);

            $.ajax({
                type: 'get',
                url: deleteLink.prop('href'),
                success: function(data) {
                    if (data && data.data && data.data.post_id) {
                        $(`#post-${data.data.post_id}`).remove();
                        new Noty({
                            theme: 'nest',
                            text: 'Post Deleted!!!',
                            type: 'success',
                            layout: 'topLeft',
                            timeout: 1500,
                        }).show();
                    } else {
                        console.log("Invalid response data:", data);
                    }
                    // $(`#post-${data.data.post._id}`).remove();
                },
                error: function(error) {
                    console.log(error.responseText);
                    new Noty({
                        theme: 'nest',
                        text: 'Failed to delete post.',
                        type: 'error',
                        layout: 'topLeft',
                        timeout: 1500,
                    }).show();
                }
            });
        });
    };

    // let deletePost = function(deleteLink) {
    //     $(deleteLink).click(function(e) {
    //         e.preventDefault();

    //         $.ajax({
    //             type: 'get',
    //             url: $(deleteLink).prop('href'),
    //             success: function(data) {
    //                 $(`#post-${data.data.post._id}`).remove();
    //             },
    //             error: function(error) {
    //                 console.log(error.responseText);
    //             }
    //         });
    //     });
    // }

    createPost();


}