import { Button } from '@mui/material';
import React from 'react'

function Product(props) {

    return (
        <>
        <h1>Ez itt a Product page.</h1>
        <Button onClick={props.addToCart}>Kosárba!</Button>
        </>
      )
}

export default Product