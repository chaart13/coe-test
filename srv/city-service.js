const cds = require("@sap/cds");
const papaparse = require("papaparse");

module.exports = function () {
  this.on("importCities", async (req) => {
    try {
      let forImport = {};
      const decodedContent = _decodePayload(req.data.fileContent);
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
          throw new CustomError("Unsupported file type");
      }

      const res = await INSERT.into(forImport.table).entries(forImport.data);
      return res;
    } catch (err) {
      req.error(
        400,
        err.name === errorName ? err : "The file format is incompatible"
      );
    }
  });
};

const errorName = "Custom";
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = errorName;
  }
}

function _parseJSON(data) {
  try {
    return JSON.parse(data);
  } catch {
    throw new CustomError("Error parsing JSON");
  }
}

function _parseCSV(data) {
  const parsed = papaparse.parse(data, { header: true });
  if (parsed.errors.length) {
    throw new CustomError("Error parsing CSV");
  }
  return parsed.data;
}

function _decodePayload(data) {
  try {
    return atob(data);
  } catch {
    throw new CustomError("Error decoding payload");
  }
}
