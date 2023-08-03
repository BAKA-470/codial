// {
//     let createComment = function() {
//         let newCommentForm = $("#new-comment-form");

//         newCommentForm.submit(function(e) {
//             e.preventDefault();

//             $.ajax({
//                 type: 'post',
//                 url: '/comments/create',
//                 data: newCommentForm.serialize(),
//                 success: function(data) {
//                     let newComment = newCommentDom(data.data.comment);
//                     $('#post-comments-list>ul').prepend(newComment).fadeIn('slow');
//                     newCommentForm.trigger('reset');
//                     new Noty({
//                         theme: 'nest',
//                         text: 'Comment Created!!!',
//                         type: 'success',
//                         layout: 'topLeft',
//                         timeout: 1500,
//                     }).show();
//                 },

//                 error: function(error) {
//                     console.log(error.responseText);
//                     new Noty({
//                         theme: 'nest',
//                         text: 'Failed to create comment.',
//                         type: 'error',
//                         layout: 'topLeft',
//                         timeout: 1500,
//                     }).show();
//                 }
//             });
//         });
//     }

//     // DOM creation for comments
//     let newCommentDom = function(comment) {
//         return $(`<li id="comment-${comment._id} ">
//         <p>

//                 <small>
//                 <a class="delete-comment-button" href="/comments/destroy/${comment._id }">X</a>
//             </small>

//                     ${comment.content}
//                         <br>
//                         <small>
//             ${comment.user.name }
//         </small>
//         </p>
//         </li>`)
//     }


//     createComment();
// }
class PostComments {
    // constructor is used to initialize the instance of the class whenever a new instance is created
    constructor(postId) {
        this.postId = postId;
        this.postContainer = $(`#post-${postId}`);
        this.newCommentForm = $(`#post-${postId}-comments-form`);

        this.createComment(postId);

        let self = this;
        // call for all the existing comments
        $(' .delete-comment-button', this.postContainer).each(function() {
            self.deleteComment($(this));
        });
    }

    createComment(postId) {
        let pSelf = this;
        this.newCommentForm.submit(function(e) {
            e.preventDefault();
            let self = this;
            // 16: 04
            // Arun Sharma
            $.ajax({
                type: 'post',
                url: '/comments/create',
                data: $(self).serialize(),
                success: function(data) {
                    let newComment = pSelf.newCommentDom(data.data.comment);
                    $(`#post-comments-${postId}`).append(newComment);
                    pSelf.deleteComment($(' .delete-comment-button', newComment));

                    // enable the functionality of the toggle like button on the new comment
                    // new ToggleLike($(' .toggle-like-button', newComment));

                    new Noty({
                        theme: 'relax',
                        text: "Comment Added",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();

                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });

        });
    }

    newCommentDom(comment) {
        // added a class 'delete-comment-button' to the delete comment link and also id to the comment's li
        // show the count of zero likes on this comment
        return $(`<li id="comment-${ comment._id }">
                        <p>
                            
                            <small>
                                <a class="delete-comment-button" href="/comments/destroy/${comment._id}">X</a>
                            </small>
                                ${comment.content}
                            <br>
                            <small>
                                ${comment.user.name}
                            </small>
                           
                        </p>    
                </li>`);
    }

    deleteComment(deleteLink) {
        $(deleteLink).click(function(e) {
            e.preventDefault();

            $.ajax({
                type: 'get',
                url: $(deleteLink).prop('href'),
                success: function(data) {
                    $(`#comment-${data.data.comment_id}`).remove();

                    new Noty({
                        theme: 'relax',
                        text: "Comment Deleted",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500

                    }).show();
                },
                error: function(error) {
                    console.log(error.responseText);
                }
            });

        });
    }
}