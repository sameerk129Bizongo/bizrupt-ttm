import {capitalizeFirstLetter} from '../utils';
const database = require('./data.json');
const category_data = database['category'];
const sku_data = database['sku'];

export const databaseFunc = () => {

  const getCategoriesList = () => {
    return (Object.keys(category_data).map(category => {
      return {
        label: capitalizeFirstLetter(category),
        value: category,
      }
    }));
  };

  const getSubCategoriesList = categoryName => {
    return (Object.keys(category_data[categoryName]).map(subCategory => {
      return {
        label: capitalizeFirstLetter(subCategory),
        value: subCategory,
      }
    }));
  };

  const getProductsList = (categoryName, subCategoryName) => {
    return (Object.keys(category_data[categoryName][subCategoryName]).map(product => {
      return {
        label: capitalizeFirstLetter(product),
        value: product,
      }
    }));
  };

  const getDimensionsList = (categoryName, subCategoryName, productName) => {
    return (Object.keys(category_data[categoryName][subCategoryName][productName]).map(dimension => {
      return {
        label: dimension,
        value: dimension,
      }
    }));
  };

  const getSpecsList = (categoryName, subCategoryName, productName, dimensionName) => {
    return (Object.keys(category_data[categoryName][subCategoryName][productName][dimensionName]).map(spec => {
      return {
        label: spec,
        value: spec,
      }
    }));
  };

  const getOneMonth = (categoryName, subCategoryName, productName, dimensionName, specName) => {
    return category_data[categoryName][subCategoryName][productName][dimensionName][specName]['one_month'];
  };

  const getThreeMonth = (categoryName, subCategoryName, productName, dimensionName, specName) => {
    return category_data[categoryName][subCategoryName][productName][dimensionName][specName]['three_month'];
  };

  const getSixMonth = (categoryName, subCategoryName, productName, dimensionName, specName) => {
    return category_data[categoryName][subCategoryName][productName][dimensionName][specName]['six_month'];
  };

  const getOneYear = (categoryName, subCategoryName, productName, dimensionName, specName) => {
    return category_data[categoryName][subCategoryName][productName][dimensionName][specName]['one_year'];
  };

  const getSKUsList = () => {
    return (Object.keys(sku_data).map(sku => {
      return {
        label: sku,
        value: sku,
      }
    }));
  };

  return {
    getCategoriesList, getSubCategoriesList,
    getProductsList, getDimensionsList, getSpecsList,
    getOneMonth, getThreeMonth, getSixMonth, getOneYear,
  }

};
