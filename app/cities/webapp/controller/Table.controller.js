sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/core/ValueState",
  ],
  function (Controller, Filter, FilterOperator, FilterType, ValueState) {
    "use strict";

    return Controller.extend("coe.cities.controller.Table", {
      onInit: function () {
        const oTable = this.getView().getContent()[0];
        oTable.bindRows(this._getEntitySet(this.getView().getId()));
      },

      onShowCreateDialog: async function () {
        this.oDialog ??= await this.loadFragment({
          name: "coe.cities.view.CreateDialog",
        });

        this.oNameInput = this.byId("idNameInput");
        this.oAreaInput = this.byId("idAreaInput");
        this.oPopInput = this.byId("idPopInput");

        this.oInput = {
          [this.oNameInput]: false,
          [this.oAreaInput]: false,
          [this.oPopInput]: false,
        };

        this.oDialog.open();
      },

      onFormatError: function (oEvent) {
        console.log(oEvent);
      },

      onCreate: async function () {
        const oData = {
          name: this.oNameInput.getValue(),
          area: this.oAreaInput.getValue(),
          population: this.oPopInput.getValue(),
        };

        this.getView().byId("idTable").getBinding("rows").create(oData);
        this.oDialog.close();
      },

      _getEntitySet(viewId) {
        return `/${viewId.substring(viewId.lastIndexOf("-") + 1)}`;
      },

      onNumericInput(oEvent) {
        this.onInputChange(oEvent);
      },

      onInputChange(oEvent) {
        const oInput = oEvent.getSource();

        if (oInput.getValue() === "") {
          this.oInput[oInput] = false;
          oInput.setValueState(ValueState.Error);
        } else {
          this.oInput[oInput] = true;
          oInput.setValueState(ValueState.None);
        }

        this.oDialog
          .getBeginButton()
          .setEnabled(Object.values(this.oInput).every((value) => value));
      },

      onCancel: function () {
        this.oDialog.close();
      },

      onBeforeClose: function () {
        const oView = this.getView();
        oView.byId("idNameInput").setValue("");
        oView.byId("idAreaInput").setValue("");
        oView.byId("idPopInput").setValue("");
      },

      onSearch: function () {
        const oView = this.getView();
        const sValue = oView.byId("idSearchField").getValue();
        const oFilter = new Filter({
          path: "name",
          operator: FilterOperator.Contains,
          value1: sValue,
          caseSensitive: false,
        });

        oView
          .byId("idTable")
          .getBinding("rows")
          .filter(oFilter, FilterType.Application);
      },

      formatDecimal: function (nValue) {
        return Number(nValue.replaceAll(",", "")).toFixed(2);
      },
    });
  }
);
