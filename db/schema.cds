namespace coe;

using {cuid} from '@sap/cds/common';

@cds.search: {name}
aspect City : cuid {
    name       : String not null;
    area       : Decimal not null;
    population : Integer not null;
    density    : Decimal = population / area;
}

define entity CSVCities : City {}
define entity JSONCities : City {}
