//useApiData.js
import { useEffect, useState } from 'react';
import { useCustom } from '@refinedev/core';
import { API_URL } from '../constants';

// Specify the type for your data, including `undefined`
export const useApiData = <T,>(endpoint: string, config: any, dependencies: any[] = []) => {
  const [data, setData] = useState<T | undefined | null| any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any>(null);


  const { data: responseData, isLoading: responseIsLoading, error: responseError } = useCustom({
    url: `${API_URL}/api/${endpoint}`,
    method: 'get',
    config,
  });

  useEffect(() => {
    setIsLoading(responseIsLoading);
    setData(responseData? responseData:[]);
    setError(responseError);
  }, [responseData, responseIsLoading, responseError, ...dependencies]);

  return { data, isLoading, error };
};
