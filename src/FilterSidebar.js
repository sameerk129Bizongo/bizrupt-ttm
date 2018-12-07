import React, {Component} from 'react';
import {Form, Button, FormControl, FormGroup, ControlLabel} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {Typeahead} from 'react-bootstrap-typeahead';

class FilterSidebar extends Component{
  constructor(props){
    super(props);

    this.state = {
      spec: "",
      sku: "",
    };

    this.handleProductNameInput = this.handleProductNameInput.bind(this);
    this.handleDimensionInput = this.handleDimensionInput.bind(this);
    this.handleSpecInput = this.handleSpecInput.bind(this);
    this.renderCategories = this.renderCategories.bind(this);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.renderSubCategories = this.renderSubCategories.bind(this);
    this.onSelectSubCategory = this.onSelectSubCategory.bind(this);
    this.handleApplyFilterClick = this.handleApplyFilterClick.bind(this);
  }

  handleProductNameInput(selected) {
    console.log('handleProductNameInput');
    console.dir({selected: selected});
    if (selected && selected.length > 0) {
      this.props.onProductSelection(selected[0].value);
    }
    else this.props.onProductSelection('');
  }

  handleDimensionInput(selected) {
    console.log('handleDimensionInput');
    console.dir({selected: selected});
    if (selected && selected.length > 0) {
      this.props.onDimensionSelection(selected[0].value);
    }
    else this.props.onDimensionSelection('');
  }

  handleSpecInput(selected) {
    console.log('handleSpecInput');
    console.dir({selected: selected});
    if (selected && selected.length > 0) {
      this.setState({spec: selected[0].value});
    }
    else this.setState({spec: ''});
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
    console.dir({Props: this.props, State: this.state});
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
            <Typeahead
              options={this.props.productsList}
              onChange={this.handleProductNameInput}
              placeholder="Enter Product Name"
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory}
            />
            <ControlLabel>Dimension</ControlLabel>
            <Typeahead
              options={this.props.dimensionsList}
              onChange={this.handleDimensionInput}
              placeholder="Enter Dimension"
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory || !this.props.selectedProduct}
            />
            <ControlLabel>Specification</ControlLabel>
            <Typeahead
              options={this.props.specsList}
              onChange={this.handleSpecInput}
              placeholder="Enter Specs"
              disabled={!this.props.selectedCategory || !this.props.selectedSubCategory || !this.props.selectedProduct || !this.props.selectedDimension}
            />
            <ControlLabel>SKU</ControlLabel>
            <FormControl
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
  selectedProduct: PropTypes.string.isRequired,
  selectedDimension: PropTypes.string.isRequired,
  categoriesList: PropTypes.array.isRequired,
  subCategoriesList: PropTypes.array.isRequired,
  productsList: PropTypes.array.isRequired,
  dimensionsList: PropTypes.array.isRequired,
  specsList: PropTypes.array.isRequired,
  onCategorySelection: PropTypes.func.isRequired,
  onSubCategorySelection: PropTypes.func.isRequired,
  onProductSelection: PropTypes.func.isRequired,
  onDimensionSelection: PropTypes.func.isRequired,
  onFilterApply: PropTypes.func.isRequired,
};

export default FilterSidebar;
