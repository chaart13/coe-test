sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
  ],
  function (Controller, Filter, FilterOperator, FilterType) {
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

        this.oDialog.open();
      },

      onCreate: async function () {
        const oView = this.getView();
        const data = {
          name: oView.byId("idNameInput").getValue(),
          area: oView.byId("idAreaInput").getValue(),
          population: oView.byId("idPopInput").getValue(),
        };

        let oBindList = oView
          .getModel()
          .bindList(this._getEntitySet(oView.getId()));

        const a = oBindList.create(data);
        // TODO: refresh the page after creation
        oBindList.refresh();

        this.oDialog.close();
      },

      _getEntitySet(viewId) {
        return `/${viewId.substring(viewId.lastIndexOf("-") + 1)}`;
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
    });
  }
);
