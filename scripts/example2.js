var ProductSearch = React.createClass({
    getInitialState: function () {
        return {data: []};
    },
    componentDidMount: function () {
        this.searchProducts();
    },
    searchProducts: function (qData) {
        $.get(this.props.url, qData, function (data) {
            this.setState({data: data});
        }.bind(this), 'JSON');
    },
    render: function () {
        var categories = this.state.data.map(function (category) {
            return (<Category name={category.name} data={category.products} key={category.id} />);
        });

        return (
            <div className="productSearch">
                <h1>Product search</h1>
                <SearchForm handleSearch={this.searchProducts} />
                {categories}
            </div>
        );
    }
});

var SearchForm = React.createClass({
    getInitialState: function () {
        return {q: ''};
    },
    handleSearchChange: function (e) {
        e.preventDefault();

        var qData = {q: e.target.value};
        this.setState(qData);
        this.props.handleSearch(qData);
    },
    render: function () {
        return (
            <form className="searchForm">
                <input
                    type="search"
                    placeholder="Search..."
                    value={this.state.q}
                    onChange={this.handleSearchChange}
                />
            </form>
        );
    }
});

var Category = React.createClass({
    render: function () {
        var products = this.props.data.map(function (product) {
            return (
                <Product name={product.name} price={product.price} key={product.id} />
            );
        });

        return (
            <div className="category">
                <h3>{this.props.name}</h3>
                <ul>
                    {products}
                </ul>
            </div>

        );
    }
});

var Product = React.createClass({
    render: function () {
        return (
            <div className="product">
                <li>
                    <strong>{this.props.name}</strong>:&nbsp;
                    {this.props.price} CZK
                </li>
            </div>
        );
    }
});

ReactDOM.render(
    <ProductSearch url="api/search.php" />,
    document.getElementById('content')
);
