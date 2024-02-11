import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../constants';

export const useApiDataCustom = (
  endpoint: string,
  config: any,
  dependencies: any[] = [],
  fetchAll = false
) => {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async (page: number) => {
        setIsLoading(true);
        setError(null); // Clear any previous error state

        // Reset data only at the beginning of a new fetchAll sequence
        if ( page === 1) {
            setData([]);
        }
        

        try {
            const modifiedConfig = { ...config, "pagination[page]": page };
            const response = await axios.get(`${API_URL}/api/${endpoint}`, {
                params: modifiedConfig,
            });
        
            const newData = response.data.data;
        
            // Conditionally update data based on fetchAll
            if (fetchAll) {
                // Append new data to existing data
                setData(prevData => [...prevData, ...(Array.isArray(newData) ? newData : [newData])]);
            } else {
                // Replace existing data with new data
                setData(Array.isArray(newData) ? newData : [newData]);
            }
        
            if (fetchAll) {
                const pageCount = response.data.meta.pagination.pageCount;
                if (page < pageCount) {
                    fetchData(page + 1);
                } else {
                    setIsLoading(false);
                }
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            setError(error);
            setIsLoading(false);
        }
    };

    fetchData(config["pagination[page]"] || 1);
}, [endpoint, JSON.stringify(config), ...dependencies, fetchAll]); 


  return { data, isLoading, error };
};
