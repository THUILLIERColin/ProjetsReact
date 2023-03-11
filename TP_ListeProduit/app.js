const PRODUCTS = [
    {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
    {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
    {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
    {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
    {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
  ];

function ProductCategoryRow ({category}) {
    return <tr>
        <th colSpan="2">{category}</th>
    </tr>
}

function ProductRow ({product}) {
    const name = product.stocked ? 
        product.name : 
        <span className="text-danger" >{product.name}</span>
    return <tr>
        <td>{name}</td>
        <td>{product.price}</td>
    </tr>
}

function ProductTable({products, filterText, inStockOnly}) {
    const rows = [];
    let lastCategory = null;

    products.forEach(product => {
        if (inStockOnly && !product.stocked) return;
        if (product.name.indexOf(filterText) === -1) return;
        if (product.category !== lastCategory) {
            lastCategory = product.category;
            rows.push(<ProductCategoryRow category={lastCategory} key={lastCategory} />)
        }
        rows.push(<ProductRow product={product} key={product.name} />)
    })

    return <table className="product-table">
        <thead>
            <tr>
                <th>Nom</th>
                <th>Prix</th>
            </tr>
        </thead>
        <tbody>
            {rows}
        </tbody>
    </table>
}

class SearchBar extends React.Component {

    constructor(props){
        super(props);
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange = (e) => {
        this.props.onFilterTextChange(e.target.value);
    }

    handleInStockChange = (e) => {
        this.props.onInStockChange(e.target.checked);
    }

    render() {
        const {filterText, inStockOnly} = this.props;
        return <div className="mb-3">
            <div className="from-group mb-0">
                <input type="text" value={filterText} className="form-control" placeholder="Rechercher..." onChange={this.handleFilterTextChange}/>
            </div>
            <div className="form-check">
                <input type="checkbox" checked={inStockOnly} className="form-check-input" id="stock" onChange={this.handleInStockChange}/> 
                <label htmlFor="stock" className="form-check-label">Afficher seulement les produits en stock</label>
            </div>
        </div> 
    }

}

class FilterableProductTable extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            filterText: '',
            inStockOnly: false
        }
        this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
        this.handleInStockChange = this.handleInStockChange.bind(this);
    }

    handleFilterTextChange = (filterText) => {
        this.setState({filterText})
    }

    handleInStockChange = (inStockOnly) => {
        this.setState({inStockOnly})
    }

    render(){
        const {products} = this.props;
        return <React.Fragment>
            <SearchBar 
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
                onFilterTextChange={this.handleFilterTextChange}
                onInStockChange={this.handleInStockChange}
            />
            <ProductTable 
                products={products}
                filterText={this.state.filterText}
                inStockOnly={this.state.inStockOnly}
            />
        </React.Fragment>
        
    }
}

ReactDOM.render(<FilterableProductTable products={PRODUCTS}/>, document.querySelector('#app'))