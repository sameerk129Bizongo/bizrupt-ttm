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
    };

    this.selectCategory = this.selectCategory.bind(this);
    this.selectSubCategory = this.selectSubCategory.bind(this);
    this.applyFilter = this.applyFilter.bind(this);
    this.getSubCategories = this.getSubCategories.bind(this);
  }

  getSubCategories() {
    console.log('getSubCategories');
    console.dir({state: this.state});
    if (this.state.selectedCategory) {
      return database.getSubCategoriesList(this.state.selectedCategory);
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
          categoriesList={database.getCategoriesList()}
          subCategoriesList={this.getSubCategories()}
          onCategorySelection={this.selectCategory}
          onSubCategorySelection={this.selectSubCategory}
          onFilterApply={this.applyFilter}
        />
      </div>
    );
  }
}

export default App;
