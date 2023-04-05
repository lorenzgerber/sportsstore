import React, { Component } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { loadData } from "../data/ActionCreators";
import { DataTypes } from "../data/Types";
import { Shop } from "./Shop";

const mapStateToProps = (dataStore) => ({
    ...dataStore
})

const mapDispatchToProps = {
    loadData
}

const filterProducts = (products = [], category) => (!category || category === "All") ? products : products.filter(p => p.category.toLowerCase() === category.toLowerCase());

export const ShopConnector = connect(mapStateToProps, mapDispatchToProps)(
    class extends Component {
        render() {
            return <Routes>
                <Route path="/shop/products/:category?"
                 render={ (routeProps) => 
                    <Shop { ...this.props } { ...routeProps } products={ filterProducts(this.props.products, routeProps.match.params.category) } />} /> 
                <Route path="/shop/:category?" element={<Navigate replace to="/shop/products" />}/> 
            </Routes>
        }

        componentDidMount() {
            this.props.loadData(DataTypes.CATEGORIES);
            this.props.loadData(DataTypes.PRODUCTS);
        }
    }
)