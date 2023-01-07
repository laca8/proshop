import React from "react";
import { Card } from "react-bootstrap";
import {Link} from 'react-router-dom'
import Rating from "../Rating/Rating";
const Product = ({product}) =>{
    const reviews = product.numReviews
    return(
        <Card className="my-3 p-1 rounded">
            <Link to={`/product/${product._id}`} >
                <Card.Img src={product.image} variant='top'/>
            </Link>
            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as ='div'>
                        <strong>
                            {product.name}
                        </strong>
                    </Card.Title>
                </Link>
                <Card.Text as='div'>
        <Card.Text as='div'>
        <Rating
            value={product.rating}
            text = {reviews} 
             />
            <span>reviews</span>
            </Card.Text>
        </Card.Text>
                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}
export default Product
