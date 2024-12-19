import { useEffect, useState } from 'react';

import axios from "axios";
import {geonameCommune, geonameCountry, geonameDistrict, geonameProvince} from "../interfaces/GeoNames/IGeoNames.ts";
import { showMessageClient } from '../utils/messages.ts';
import { handleChangeMessage } from '../utils/index.ts';
import { useContextGlobal } from '../contexts/index.tsx';


const useCountry = () => {
    const {  locale } = useContextGlobal();
    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<geonameCountry[]>([]);
    const [loadingProvinces, setLoadingProvinces] = useState<boolean>(false);
    const [provinces, setProvinces] = useState<geonameProvince[]>([]);
    const [loadingDistricts, setLoadingDistricts] = useState<boolean>(false);
    const [districts, setDistricts] = useState<geonameDistrict[]>([]);
    const [communes, setCommunes] = useState<geonameCommune[]>([]);
    const [loadingCommune, setLoadingCommune] = useState<boolean>(false);

    const [deviceAddress, setDeviceAddress] = useState('');
    const [thisDeviceAddressGeoname, setThisDeviceAddressGeoname] = useState<geonameCountry | undefined>();
    const getCountries = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get('http://api.geonames.org/countryInfoJSON?username=louis1124');
            setCountries(data.geonames);

        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoading(false);
        }
    }
    const getProvinces = async (geonamesCountryId: string) => {
        try {
            setLoadingProvinces(true);
            const { data } = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonamesCountryId}&username=louis1124`);
            setProvinces(data.geonames);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoadingProvinces(false);
        }
    }
    const getDistricts = async (geonamesProvinceId: string) => {
        try {
            setLoadingDistricts(true);
            const { data } = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonamesProvinceId}&username=louis1124`);
            setDistricts(data.geonames);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoadingDistricts(false);
        }
    }
    const getCommunes = async (geonamesDistrictId: string) => {
        try {
            setLoadingCommune(true);
            const { data } = await axios.get(`http://api.geonames.org/childrenJSON?geonameId=${geonamesDistrictId}&username=louis1124`);
            setCommunes(data.geonames);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        } finally {
            setLoadingCommune(false);
        }
    }
    const getDeviceCountry = async () => {
        try {
            const { data } = await axios.get(`http://ipinfo.io/?token=460c929b3a6791`);
            setDeviceAddress(data.country);
        } catch (error) {
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        }
    }
    const getDeviceCountryGeonames = async (country: string) => {
        try {
            const { data } = await axios.get(`http://api.geonames.org/countryInfoJSON?country=${country}&username=louis1124`)
            setThisDeviceAddressGeoname(data.geonames[0]);

        }catch (error){
            showMessageClient((error as any)?.response?.data?.message || handleChangeMessage(locale,'Something went wrong!','Đã xảy ra lỗi!') , '', 'error');
        }
    }
    useEffect(() => {
        if (deviceAddress) {
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
        getDistricts,
        districts,
        loadingDistricts,
        setThisDeviceAddressGeoname,
        communes,
        getCommunes,
        loadingCommune,

    };
};

export default useCountry;
