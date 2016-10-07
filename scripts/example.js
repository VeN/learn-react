var CommentBox  = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList data={this.props.data} />
                <CommentForm />
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
    render: function () {
        return (
            <div className="commentForm">
                I am a Comment Form.
            </div>
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
                <h2 className="author">
                    {this.props.author}
                </h2>
                <span dangerouslySetInnerHTML={this.rawMarkup()} />
            </div>
        );
    }
});

var comments = [
    {
        id: 1,
        author: "John Snow",
        text: "Upon being guided into the inner-sanctum at the Oculus Connect developers conference."
    },
    {
        id: 2,
        author: "Disguised Toast",
        text: "Snap is *reportedly* preparing for an IPO that could value it at $25B or higher"
    }
];

ReactDOM.render(
    <CommentBox data={comments} />,
    document.getElementById('content')
);
