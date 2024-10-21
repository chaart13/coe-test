const cds = require("@sap/cds");

module.exports = async function () {
  this.after("each", "CSVCities", (city) => {
    city.density = (city.population / city.area).toFixed(2);
  });

  this.after("each", "JSONCities", (city) => {
    city.density = (city.population / city.area).toFixed(2);
  });
};
