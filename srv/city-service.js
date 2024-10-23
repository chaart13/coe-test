const cds = require("@sap/cds");
const papaparse = require("papaparse");

module.exports = function () {
  this.on("importCities", (req) => {
    try {
      let forImport = {};
      const decodedContent = atob(req.data.fileContent);
      switch (req.data.mimeType) {
        case "application/json":
          forImport = {
            data: _parseJSON(decodedContent),
            table: cds.entities.JSONCities,
          };
          break;
        case "text/csv":
          forImport = {
            data: _parseCSV(decodedContent),
            table: cds.entities.CSVCities,
          };
          break;
        default:
          throw new Error("Not supported type");
      }

      return INSERT.into(forImport.table).entries(forImport.data);
    } catch (err) {
      req.error(400, err);
    }
  });
};

function _parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch {
    throw new Error("Error parsing JSON");
  }
}

function _parseCSV(data) {
  const parsed = papaparse.parse(data, { header: true });
  if (parsed.errors.length) {
    throw new Error("Error parsing CSV");
  }
  return parsed.data;
}
