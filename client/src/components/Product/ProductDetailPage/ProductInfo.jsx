import 'antd/es/descriptions/style/index.css';
import 'antd/es/button/style/index.css';
import '../StylesProduct.css'
import React, {useEffect, useState} from "react";
import {Button, Descriptions} from "antd";
import Axios from "axios";

function ProductInfo(props){

    const [Product, setProduct] = useState([]);
    const [PrintAmount, setPrintAmount] = useState(0);
    const [booVal, setBooVal] = useState(false);

    useEffect(() => {
        setProduct(props.detail)

    },[props.detail]);


    useEffect(() => {
        Axios.get('http://localhost:5000/api/discounts/productdiscount/' + Product._id)
            .then(response => {
                if (response.data.length > 0){
                    let x = parseFloat(response.data[0].discountAmount);
                    let finalAmount = parseFloat(Product.productUnitPrice) - x;
                    setPrintAmount(finalAmount)
                    setBooVal(true)
                } else {
                    setPrintAmount(Product.productUnitPrice)
                }

            })
            .catch(function (err) {
                console.log(err)
            });

    },[Product]);



    const test = () => {
        if (booVal){
            return <span id="test"><span id="spanBeforePrice">{Product.productUnitPrice}</span> {PrintAmount}</span>
        } else {
            console.log(PrintAmount)
            return  <span id="test">{PrintAmount}</span>
        }
    };

    return (
        <div>
            <Descriptions title="Product Information">
                <Descriptions.Item label="Price">
                    { test() }
                </Descriptions.Item>
                <Descriptions.Item label="Colour">{Product.productColour}</Descriptions.Item>
                <Descriptions.Item label="Size">{Product.productSize}</Descriptions.Item>
                <Descriptions.Item label="Description">{Product.productDesc}</Descriptions.Item>
                {/*<br />*/}
                {/*<br />*/}
                {/*<br />*/}

            </Descriptions>
            <br />
            <br />
            <br />
            <div className="row">
                <div className="col-md-6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" shape="round" type="danger"
                            // onClick
                        >
                            Add to Cart
                        </Button>
                    </div>
                </div>
                <div className="col-md-6">
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button size="large" shape="round" type="primary"
                            // onClick
                        >
                            Add to Wishlist
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default ProductInfo;