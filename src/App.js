import React, { Component } from 'react';
import './App.css';
import FilterSidebar from './FilterSidebar';
import {databaseFunc} from './database';

const database = databaseFunc();

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedCategory: '',
      selectedSubCategory: '',
      selectedProduct: '',
      selectedDimension: '',
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.selectSubCategory = this.selectSubCategory.bind(this);
    this.selectProduct = this.selectProduct.bind(this);
    this.selectDimension = this.selectDimension.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.getSubCategories = this.getSubCategories.bind(this);
    this.getProducts = this.getProducts.bind(this);
    this.getDimensions = this.getDimensions.bind(this);
    this.getSpecs = this.getSpecs.bind(this);
  }

  getSubCategories() {
    console.log('getSubCategories');
    console.dir({state: this.state});
    if (this.state.selectedCategory) {
      return database.getSubCategoriesList(this.state.selectedCategory);
    }
    else return [];
  }

  getProducts() {
    console.log('getProducts');
    console.dir({state: this.state});
    if (this.state.selectedCategory && this.state.selectedSubCategory) {
      return database.getProductsList(this.state.selectedCategory, this.state.selectedSubCategory);
    }
    else return [];
  }

  getDimensions() {
    console.log('getDimensions');
    console.dir({State: this.state});
    if (this.state.selectedCategory && this.state.selectedSubCategory && this.state.selectedProduct) {
      return database.getDimensionsList(
        this.state.selectedCategory,
        this.state.selectedSubCategory,
        this.state.selectedProduct
      )
    }
    else return [];
  }

  getSpecs() {
    console.log('getSpecsList');
    console.dir({State: this.state});
    if (this.state.selectedCategory && this.state.selectedSubCategory && this.state.selectedProduct && this.state.selectedDimension) {
      return database.getSpecsList(
        this.state.selectedCategory,
        this.state.selectedSubCategory,
        this.state.selectedProduct,
        this.state.selectedDimension,
      )
    }
    else return [];
  }

  selectCategory(value) {
    console.log('selectCategory');
    console.dir({value: value});
    this.setState({selectedCategory: value});
  }

  selectSubCategory(value) {
    console.log('selectSubCategory');
    console.dir({value: value});
    this.setState({selectedSubCategory: value});
  }

  selectProduct(value) {
    console.log('selectProduct');
    console.dir({value: value});
    this.setState({selectedProduct: value});
  }

  selectDimension(value) {
    console.log('selectDimension');
    console.dir({value: value});
    this.setState({selectedDimension: value});
  }

  applyFilter(filters) {
    console.log('applyFilter');
    console.dir(filters);
  }

  render() {
    return (
      <div className="App">
        <FilterSidebar
          selectedCategory={this.state.selectedCategory}
          selectedSubCategory={this.state.selectedSubCategory}
          selectedProduct={this.state.selectedProduct}
          selectedDimension={this.state.selectedDimension}
          categoriesList={database.getCategoriesList()}
          subCategoriesList={this.getSubCategories()}
          productsList={this.getProducts()}
          dimensionsList={this.getDimensions()}
          specsList={this.getSpecs()}
          onCategorySelection={this.selectCategory}
          onSubCategorySelection={this.selectSubCategory}
          onProductSelection={this.selectProduct}
          onDimensionSelection={this.selectDimension}
          onFilterApply={this.applyFilter}
        />
      </div>
    );
  }
}

export default App;
