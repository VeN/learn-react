var CommentBox  = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    loadCommentsFromServer: function () {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    componentDidMount: function () {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    handleCommentSubmit: function (comment) {
        console.log(comment);
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            type: 'POST',
            data: comment,
            success: function (data) {
                this.setState({data: data});
            }.bind(this),
            error: function (xhr, status, err) {
                console.log(this.props.url, status, err);
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.state.data} />
                <CommentForm onCommentSubmit={this.handleCommentSubmit}/>
            </div>
        );
    }
});

var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author} key={comment.id}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentForm = React.createClass({
    getInitialState: function () {
        return {author: '', text: ''}
    },
    handleAuthorChange: function (e) {
        this.setState({author: e.target.value});
    },
    handleTextChange: function (e) {
        this.setState({text: e.target.value});
    },
    handleSubmit: function (e) {
        e.preventDefault();
        var author = this.state.author.trim();
        var text = this.state.text.trim();
        if (!author || !text) {
            return;
        }

        this.props.onCommentSubmit({author: author, text: text});

        this.setState({author: '', text: ''});
    },
    render: function () {
        return (
            <form className="commentForm" onSubmit={this.handleSubmit}>
                <h1>Add a comment</h1>
                <p>
                    <input type="text"
                       placeholder="Your name"
                       value={this.state.author}
                       onChange={this.handleAuthorChange}
                    /><br />
                </p>
                <p>
                    <input type="text"
                       placeholder="Say something..."
                       value={this.state.text}
                       onChange={this.handleTextChange}
                    /><br />
                </p>
                <input type="submit" value="Add" />
            </form>
        );
    }
});

var Comment = React.createClass({
    rawMarkup: function () {
        var md = new Remarkable();
        var rawMarkup = md.render(this.props.children.toString());
        return { __html: rawMarkup };
    },
    render: function () {
        return (
            <div className="comment">
                <h3 className="author">{this.props.author}</h3>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

ReactDOM.render(
    <CommentBox url="api/comments.php" pollInterval={1000} />,
    document.getElementById('content')
);
