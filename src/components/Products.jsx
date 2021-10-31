import React from "react";

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				products: [],
				totalAdded: [],
				isLoading: true,
				error: null,
				result: 0,
				added: 'Add',			
		}

		this.result = this.result.bind(this)
	}

  componentDidMount() {
		fetch('https://fakestoreapi.com/products')
			.then((res) => res.json())
			.then(
				data => {
				this.setState({
					products: data.map(product => ({...product, added: false}))
				})
			},
				error => {
					this.setState({
						isLoading: true,
						error: error,
					})
				}
			)		
}

result(id,title,price){
	this.setState({
		result: this.state.result + price,
	})
	this.setState({
		totalAdded: [...this.state.products, {
			id: id,
			price: price,
			title: title,
			// added: true,
		}]  
	})
	this.state.products.map(product => product.id === id ?  {...product, added: true} : {...product})
}

    render() {
			console.log('id', this.state.totalAdded)
			const {error, isLoading, products, added} = this.state;
				if (error) {
					return <p>Error {error.message}</p>
				}		else if  (!isLoading) {
					<p>Loading...</p>
				} else {
						return (
							<>
							<ul>
								{products
									.map(product => 
										<li key={product.id}>
											{product.id + '. ' + product.title + '--- ' + product.price}
											<button key={product.id}
												onClick={() =>  this.result(product.id, product.title,product.price)}>
												{added}
											</button>
										</li>
										)
								}
							</ul>
							<div className="result"> Result
							<div className="div">{this.state.result.toFixed(2)}</div>
							</div>
							</>
			)
				}
	
	}
}

export default Products;