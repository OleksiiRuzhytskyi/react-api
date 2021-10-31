import React from "react";


class ListApi extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			err: null,
			isLoaded: false,
			products: [],
			totalSum: 0,
		}	

		this.addPrice = this.addPrice.bind(this)
	}

	componentDidMount() {
		fetch('https://fakestoreapi.com/products/')
			.then(response => response.json()) 
			.then(data => {
			this.setState({
				products: data.map(product => ({...product, added: false}))
			})
		})
		
	}

	addPrice(price, id) {
		console.log('before', this.state.products[id])
		this.setState({
			totalSum: this.state.totalSum + price,
		})
			const products = [...this.state.products]
			products.map(product => {
					return {
						isLoaded: true,
						id: product.id,
						title: product.title,
						price: product.price,
						added: false,
					}
				}
			)
			this.setState({
				products
			})
	
		this.state.products
			.filter(product => product.title === id)

		// this.state.products
		// 	.map(product => product.added !== product.id ? 
		// 		{...product, added: !product.added} : 
		// 		{...product})
				console.log('after',this.state.products[id])
	}	 
		
	render() {
		console.log(this.state.products)
		const{err, isLoaded} = this.state;
			if (err) {
				return <p>Error {err.messege}</p>
			} else if (isLoaded) {
				return <p>Loading...</p>
			} else {
		return (
			<>
			<table>
				<thead>
					<th>ID</th>
					<th>TITLE</th>
					<th>PRICE</th>
				</thead>
				<tbody>
					{this.state.products.map((product => 
					<>
					<tr key={product.id}>
						<td >{product.id}</td>
						<td className="title">{product.title}</td>
						<td >{product.price}</td>
						<td>
							<button 
								id={product.id} 
								onClick={() => 
								{this.addPrice()}}>
									{product.added ? 'Remove' : 'Add'}
									</button>
						</td>
					</tr>
					</>
					))}
				</tbody>
				<tfoot >
					<tr >
						<td style={{border: 'none', padding: '0'}}></td>
						<td style={{border: 'none', padding: '0'}}></td>
						<td style={{border: 'none', padding: '0'}}className="float">
								<div>{this.state.totalSum.toFixed(2)}</div>
						</td>
					</tr>
				</tfoot>
				
			</table>

		
				
			</>
		)
		}
	}
}
export default ListApi

