sap.ui.define(
  ["sap/ui/core/mvc/Controller", "sap/m/MessageToast", "sap/m/MessageBox"],
  function (Controller, MessageToast, MessageBox) {
    "use strict";

    return Controller.extend("coe.cities.controller.Tab", {
      onInit: function () {
        const oInput = document.createElement("input");

        oInput.hidden = true;
        oInput.type = "file";
        oInput.id = "idUpload";
        oInput.accept = "application/json, text/csv";

        oInput.addEventListener("change", this.onChange.bind(this));

        document.body.appendChild(oInput);
      },

      onUpload: function () {
        document.getElementById("idUpload").click();
      },

      onChange: function (oEvent) {
        const oInput = oEvent.target;
        const oReader = new FileReader();
        const oFile = oInput.files[0];

        const that = this;

        oReader.onload = function (oEvent) {
          const oModel = that.getView().getModel();
          const oData = this._parseDataURL(oEvent.target.result);

          const oOperation = oModel.bindContext("/importCities(...)");
          for (const [key, value] of Object.entries(oData)) {
            oOperation.setParameter(key, value);
          }

          oOperation.invoke().then(
            function () {
              oModel.refresh();
              MessageToast.show(
                `${
                  oOperation.getBoundContext().getObject().results[0].changes
                } cities were imported.`
              );
            },
            function (oError) {
              MessageBox.error(oError.message);
            }
          );

          oInput.value = "";
        }.bind(this);

        oReader.onerror = function (oEvent) {
          MessageToast.show(oEvent.target.error);
        };

        oReader.readAsDataURL(oFile);
      },

      _parseDataURL: function (dataURL) {
        const arr = dataURL.split(",");
        return {
          mimeType: arr[0].match(/:(.*?);/)[1],
          fileContent: arr[1],
        };
      },
    });
  }
);
