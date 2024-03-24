import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL, TOKEN_KEY } from '../constants';

// Define the hook with a generic type parameter T, defaulting to any[]
export const useApiDataCustom = <T = any[]>(
  endpoint: string,
  config: any,
  dependencies: any[] = [],
  fetchAll = false
) => {
  // Use the generic type T for data state
  const [data, setData] = useState<T>([] as unknown as T); // Cast [] as T to satisfy TypeScript
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async (page: number) => {
        setIsLoading(true);
        setError(null); // Clear any previous error state

        if (page === 1) {
            setData([] as unknown as T); // Reset data for new fetchAll sequence
        }

        try {

                // Attempt to retrieve the JWT token from localStorage
            let jwtToken = null;
            try {
                jwtToken = localStorage.getItem(TOKEN_KEY);
            } catch (error) {
                console.error('Error accessing localStorage:', error);
            }

            // Modify the request headers to include the authorization token if it exists
            const headers = {
                ...config.headers,
            };
            if (jwtToken) {
                headers['Authorization'] = `Bearer ${jwtToken}`;
            }
            const modifiedConfig = {
                ...config,
                "pagination[page]": page,       
            };
            const response = await axios.get(`${API_URL}/api/${endpoint}`, {
                params: modifiedConfig,
                headers
            });
        
            const newData = response.data.data as T;
        
            if (fetchAll) {
                // Append new data to existing data, assuming newData is compatible with T
                setData(prevData => [...prevData as any[], ...(Array.isArray(newData) ? newData : [newData])] as unknown as T);
            } else {
                // Replace existing data with new data, assuming newData is compatible with T
                setData(Array.isArray(newData) ? newData : [newData] as unknown as T);
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
