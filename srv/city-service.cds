using coe from '../db/schema';

service CityService {
    entity CSVCities  as projection on coe.CSVCities;
    entity JSONCities as projection on coe.JSONCities;

    action importCities(fileContent : String @mandatory,
                        mimeType : String @mandatory ) returns {}
}
