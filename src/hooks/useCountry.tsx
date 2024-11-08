import {useEffect, useState} from 'react';

import axios from "axios";
import {geonameCountry, geonameProvince} from "../interfaces/GeoNames/IGeoNames.ts";


const useCountry = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<geonameCountry[]>([]);
    const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<geonameProvince[]>([]);
    const [deviceAddress, setDeviceAddress] = useState('');
    const [thisDeviceAddressGeoname,setThisDeviceAddressGeoname] = useState({});
    const getCountries = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get('http://api.geonames.org/countryInfoJSON?username=louis1124');

            setCountries(data.geonames);

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    const getProvinces = async (geonamesCountryId: string) => {
        try {
            setLoadingProvinces(true);
            const {data} = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonamesCountryId}&username=louis1124`);
            setProvinces(data.geonames);

        } catch (error) {
            console.log(error)
        } finally {
            setLoadingProvinces(false);
        }
    }
    const getDeviceCountry = async() => {
        try {
            const {data} = await axios.get(`http://ipinfo.io/?token=460c929b3a6791`);
            setDeviceAddress(data.country);
        }catch (error)
        {
            console.log(error);
        }
    }
    const getDeviceCountryGeonames = async (country:string) => {
        try {
            const {data} = await axios.get(`http://api.geonames.org/countryInfoJSON?country=${country}&username=louis1124`)
            setThisDeviceAddressGeoname(data.geonames[0]);
        }catch (error){
            console.log(error);
        }
    }
    useEffect(() => {
        if(deviceAddress){
            getDeviceCountryGeonames(deviceAddress);
        }
        getCountries();
        getDeviceCountry();


    }, [deviceAddress]);

    return {
        loading,
        countries,
        thisDeviceAddressGeoname,
        getCountries,
        getProvinces,
        loadingProvinces,
        provinces,
        deviceAddress,
        getDeviceCountry,

    };
};

export default useCountry;
