import React, { Component } from 'react';
import './App.css';
import FilterSidebar from './FilterSidebar';
import GraphView from './GraphView';

const categoriesList = [{
  value: 'temp',
  label: 'Temp',
}];

const subCategoriesList = [{
  value: 'temp',
  label: 'Temp',
}];

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
          categoriesList={categoriesList}
          subCategoriesList={subCategoriesList}
          onCategorySelection={this.selectCategory}
          onSubCategorySelection={this.selectSubCategory}
          onFilterApply={this.applyFilter}
        />
	      <GraphView />
      </div>
    );
  }
}

export default App;
