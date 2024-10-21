using coe from '../db/schema';

service CityService {
    entity CSVCities  as projection on coe.CSVCities;
    entity JSONCities as projection on coe.JSONCities;
}
