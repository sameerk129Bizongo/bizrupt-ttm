import {capitalizeFirstLetter} from './utils';
const database = require('./database.json');

export const databaseFunc = () => {

  const getCategoriesList = () => {
    return (Object.keys(database).map(category => {
      return {
        label: capitalizeFirstLetter(category),
        value: category,
      }
    }));
  };

  const getSubCategoriesList = categoryName => {
    return (Object.keys(database[categoryName]).map(subCategory => {
      return {
        label: capitalizeFirstLetter(subCategory),
        value: subCategory,
      }
    }));
  };

  const getProductsList = (categoryName, subCategoryName) => {
    return (Object.keys(database[categoryName][subCategoryName]).map(product => {
      return {
        label: capitalizeFirstLetter(product),
        value: product,
      }
    }));
  };

  const getDimensionsList = (categoryName, subCategoryName, productName) => {
    return (Object.keys(database[categoryName][subCategoryName][productName]).map(dimension => {
      return {
        label: dimension,
        value: dimension,
      }
    }));
  };

  return {
    getCategoriesList, getSubCategoriesList, getProductsList, getDimensionsList,
  }

};
