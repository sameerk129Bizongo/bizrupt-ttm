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

  const getProductsList = (category, subCategory) => {
    return (Object.keys(database[category][subCategory]).map(product => {
      return {
        label: capitalizeFirstLetter(product),
        value: product,
      }
    }));
  };

  return {
    getCategoriesList, getSubCategoriesList, getProductsList
  }

};
