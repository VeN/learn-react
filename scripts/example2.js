var ProductSearch = React.createClass({
    render: function () {
        var categories = this.props.data.map(function (category) {
            return (<Category name={category.name} data={category.products} key={category.id} />);
        });

        return (
            <div className="productSearch">
                <SearchForm />
                {categories}
            </div>
        );
    }
});

var SearchForm = React.createClass({
    render: function () {
        return (
            <form className="searchForm">
                <input type="search" placeholder="Search..." />
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

var products = [
    {
        id: 1,
        name: "Toys",
        products: [
            {id: 1, name: "Teddy Bear", price: 123},
            {id: 2, name: "Police Car", price: 300}
        ]
    }, {
        id: 2,
        name: "Stationery",
        products: [
            {id: 3, name: "White Paper", price: 2},
            {id: 4, name: "Colour Envelope", price: 11},
        ]
    }
];

ReactDOM.render(
    <ProductSearch data={products} />,
    document.getElementById('content')
);
