module comment {
    use 0x1::debug;
    use 0x1::string;
    use 0x1::timestamp;
    use 0x1::vector;

    struct Comment has key {
        id: u64,
        author: address,
        content: string::String,
        timestamp: u64,
        deleted: bool, // 삭제 여부를 나타내는 플래그
    }

    // 전역 벡터를 사용하여 댓글을 저장
    struct CommentStore has key {
        comments: vector<Comment>,
    }

    public fun add_comment(store: &mut CommentStore, author: &address, content: string::String) {
        let comment = Comment {
            id: vector::length(&store.comments) as u64,
            author: *author,
            content: content,
            timestamp: timestamp::now(),
            deleted: false,
        };
        vector::push_back(&mut store.comments, comment);
        debug::print(&store.comments);
    }

    public fun delete_comment(store: &mut CommentStore, comment_id: u64) {
        let len = vector::length(&store.comments);
        let mut i = 0;
        while (i < len) {
            let comment = &mut vector::borrow_mut(&mut store.comments, i);
            if (comment.id == comment_id) {
                comment.deleted = true;
                break;
            }
            i = i + 1;
        }
        debug::print(&store.comments);
    }

    public fun edit_comment(store: &mut CommentStore, comment_id: u64, new_content: string::String) {
        let len = vector::length(&store.comments);
        let mut i = 0;
        while (i < len) {
            let comment = &mut vector::borrow_mut(&mut store.comments, i);
            if (comment.id == comment_id) {
                comment.content = new_content;
                break;
            }
            i = i + 1;
        }
        debug::print(&store.comments);
    }

    public fun init(store: &signer) {
        move_to(store, CommentStore { comments: vector::empty<Comment>() });
    }

    public fun get_comments(store: &CommentStore): &vector<Comment> {
        &store.comments
    }
}
