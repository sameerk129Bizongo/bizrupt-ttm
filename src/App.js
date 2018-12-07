import React, { Component } from 'react';
import './App.css';
import FilterSidebar from './filterSidebar';

const categoriesList = [{
  value: 'temp',
  label: 'temp',
}];

const subCategoriesList = [{
  value: 'temp',
  label: 'temp',
}];

class App extends Component {
  render() {
    return (
      <div className="App">
        <FilterSidebar
          categoriesList={categoriesList}
          subCategoriesList={subCategoriesList}
          onCategorySelection={() => {}}
          onSubCategorySelection={() => {}}/>
      </div>
    );
  }
}

export default App;
