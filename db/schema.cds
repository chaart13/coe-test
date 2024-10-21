namespace coe;

using {cuid} from '@sap/cds/common';

@cds.search: {name}
aspect City : cuid {
    name            : String;
    area            : Decimal(10, 2);
    population      : Integer;
    virtual density : Decimal(10, 2);
}

define entity CSVCities : City {}
define entity JSONCities : City {}
