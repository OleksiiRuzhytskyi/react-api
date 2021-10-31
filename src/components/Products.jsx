import React from "react";

class Products extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
				products: [],
				totalAdded: [],
				isLoading: true,
				error: null,
				totalPrice: 0,
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
	
result(product){
	// this.setState({
	// 	result: this.state.result + price,
	// })

	this.setState({
		totalAdded: [...this.state.totalAdded, product],
		
		// added: this.state.totalAdded.filter(item => item.id === product.id && this.state.added === 'Add' ? 'Remove' : 'Add')
	})

	const newProducts = this.state.products.slice()
	const itemClickIndex = newProducts.findIndex(item => item.id === product.id)
	// newProducts[itemClickIndex] = {...newProducts[itemClickIndex], 
		if(!newProducts[itemClickIndex].added){
				newProducts[itemClickIndex] = {...newProducts[itemClickIndex], added: true}
				this.setState({
					totalPrice: this.state.totalPrice + newProducts[itemClickIndex].price
				})
			} else {
				newProducts[itemClickIndex] = {...newProducts[itemClickIndex], added: false}
					this.setState({
					totalPrice: this.state.totalPrice - newProducts[itemClickIndex].price
				})
			}
	
			

	this.setState({
		products: newProducts,
	})
}




    render() {
		console.log(this.state.products)
		// console.log(itemClickIndex)

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
												onClick={() =>  this.result(product)}>
												{!product.added ? 'Add' : 'Remove'}
											</button>
										</li>
										)
								}
							</ul>
							<div className="result"> Result
							<div className="div">{this.state.totalPrice.toFixed(2)}</div>
							</div>
							</>
			)
				}
	
	}
}

export default Products;