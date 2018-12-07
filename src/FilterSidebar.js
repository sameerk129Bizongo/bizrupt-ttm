import React, {Component} from 'react';
import {Form, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import PropTypes from 'prop-types';

class FilterSidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      productName: "",
      dimension: "",
      sku: "",
    };

    this.handleProductNameInput = this.handleProductNameInput.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
    this.onSelectSubCategory = this.onSelectSubCategory.bind(this);
    this.handleApplyFilterClick = this.handleApplyFilterClick.bind(this);
  }

  handleProductNameInput(event) {
    console.log('handleProductNameInput');
    console.dir({value: event.target.value});
    this.setState({productName: event.target.value});
  }

  handleDimensionInput(event) {
    console.log('handleDimensionInput');
    console.dir({value: event.target.value});
    this.setState({dimension: event.target.value});
  }

  handleSkuInput(event) {
    console.log('handleSkuInput');
    console.dir({value: event.target.value});
    this.setState({sku: event.target.value});
  }

  renderCategories() {
    return this.props.categoriesList.map(categoryObj => {
      return <option key={categoryObj.value} value={categoryObj.value}>{categoryObj.label}</option>
    });
  }

  onSelectCategory(event) {
    console.log('onSelectCategory');
    console.dir({value: event.target.value});
    this.props.onCategorySelection(event.target.value);
  }

  renderSubCategories() {
    return this.props.subCategoriesList.map(subCategoryObj => {
      return <option key={subCategoryObj.value} value={subCategoryObj.value}>{subCategoryObj.label}</option>
    });
  }

  onSelectSubCategory(event) {
    console.log('onSelectSubCategory');
    console.dir({value: event.target.value});
    this.props.onSubCategorySelection(event.target.value);
  }

  handleApplyFilterClick() {
    console.log('handleApplyFilterClick');
    this.props.onFilterApply(this.state);
  }

  render(){
    console.log('Props are:');
    console.dir(this.props);
    return(
      <div style={{width: '30%'}}>
        <Form>
          <FormGroup>
            <ControlLabel>Category</ControlLabel>
            <FormControl
              onChange={this.onSelectCategory}
              value={this.props.selectedCategory}
              componentClass="select"
              placeholder="Select Category">
              <option value={null} defaultValue>Select...</option>
              {this.renderCategories()}
            </FormControl>
            <ControlLabel>SubCategory</ControlLabel>
            <FormControl
              disabled={!this.props.selectedCategory}
              onChange={this.onSelectSubCategory}
              componentClass="select"
              value={this.props.selectedSubCategory}
              placeholder="Select SubCategory">
              <option value={null} defaultValue>Select...</option>
              {this.renderSubCategories()}
            </FormControl>
            <ControlLabel>Product Name</ControlLabel>
            <FormControl
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory}
              type="text"
              value={this.state.productName}
              placeholder="Enter Product Name"
              onChange={this.handleProductNameInput}
            />
            <ControlLabel>Dimension</ControlLabel>
            <FormControl
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory}
              type="text"
              value={this.state.dimension}
              placeholder="Enter Dimensions"
              onChange={this.handleDimensionInput}
            />
            <ControlLabel>SKU</ControlLabel>
            <FormControl
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory}
              type="text"
              value={this.state.sku}
              placeholder="Enter Dimensions"
              onChange={this.handleSkuInput}
            />
            <Button onClick={this.handleApplyFilterClick}>Apply</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }


}

FilterSidebar.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
  selectedSubCategory: PropTypes.string.isRequired,
  categoriesList: PropTypes.array.isRequired,
  subCategoriesList: PropTypes.array.isRequired,
  onCategorySelection: PropTypes.func.isRequired,
  onSubCategorySelection: PropTypes.func.isRequired,
  onFilterApply: PropTypes.func.isRequired,
};

export default FilterSidebar;
