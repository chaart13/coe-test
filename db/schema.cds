namespace coe;

using {cuid} from '@sap/cds/common';

@cds.search: {name}
aspect City : cuid {
    name       : String;
    area       : Decimal;
    population : Integer;
    density    : Decimal = population / area;
}

define entity CSVCities : City {}
define entity JSONCities : City {}
