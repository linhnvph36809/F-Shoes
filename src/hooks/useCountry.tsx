import { useEffect, useState } from 'react';

import { tokenManagerInstance } from '../api';
import axios from "axios";



const useCountry = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState([]);
    const getCountries = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2');

            setCountries(data);
        }catch (error)
        {
            console.log(error)
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCountries();
    }, []);

    return {
        loading,
        countries,
        getCountries,

    };
};

export default useCountry;
