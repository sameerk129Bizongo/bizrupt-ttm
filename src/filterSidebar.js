import React, {Component} from 'react';
import {Form, Button, FormControl, FormGroup, ControlLabel, HelpBlock} from 'react-bootstrap';
import PropTypes from 'prop-types';

class FilterSidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      productName: null,
      subCategory: null,
      Category: null,
    };

    this.handleProductNameInput = this.handleProductNameInput.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
    this.onSelectSubCategory = this.onSelectSubCategory.bind(this);
    this.handleApplyFilterClick = this.handleApplyFilterClick.bind(this);
  }

  handleProductNameInput(event) {
    console.log('value of input is');
    console.dir({value: event.target.value});
    this.setState({productName: event.target.value});
  }

  renderCategories() {
    return this.props.categoriesList.map(categoryObj => {
      return <option key={categoryObj.value}>{categoryObj.label}</option>
    });
  }

  onSelectCategory() {
    console.log('onSelectCategory');
    this.props.onCategorySelection();

  }

  renderSubCategories() {
    return this.props.subCategoriesList.map(subCategoryObj => {
      return <option key={subCategoryObj.value}>{subCategoryObj.label}</option>
    });
  }

  onSelectSubCategory() {
    console.log('onSelectSubCategory');
    this.props.onSubCategorySelection();
  }

  handleApplyFilterClick() {
    console.log('handleApplyFilterClick');
  }

  render(){
    return(
      <div style={{width: '30%'}}>
        <Form>
          <FormGroup>
            <ControlLabel>Category</ControlLabel>
            <FormControl
              onSelect={this.onSelectCategory}
              componentClass="select"
              placeholder="Select Category">
              {this.renderCategories()}
            </FormControl>
            <ControlLabel>SubCategory</ControlLabel>
            <FormControl
              onSelect={this.onSelectSubCategory}
              componentClass="select"
              placeholder="Select SubCategory">
              {this.renderSubCategories()}
            </FormControl>
            <ControlLabel>Product Name</ControlLabel>
            <FormControl
              type="text"
              value={this.state.productName}
              placeholder="Enter Product Name"
              onChange={this.handleProductNameInput}
            />
            <Button onClick={this.handleApplyFilterClick}>Apply</Button>
          </FormGroup>
        </Form>
      </div>
    )
  }


}

FilterSidebar.propTypes = {
  categoriesList: PropTypes.array.isRequired,
  subCategoriesList: PropTypes.array.isRequired,
  onCategorySelection: PropTypes.func.isRequired,
  onSubCategorySelection: PropTypes.func.isRequired,
};

export default FilterSidebar;
