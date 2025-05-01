import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../data/exercise";

interface DataProviderProps {
  id: string;
  children: React.ReactNode;
}

interface DataContextType {
  exercise: Exercise;
  loading: boolean;
  error: string | null;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<DataProviderProps> = ({ id, children }) => {
  const [exercise, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://stub-backend.com/api/resource/${id}`);
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (Number.isNaN(id)) { setLoading(false); }
    else {
      fetchData();
    }
  }, [id]);

  return (
    <DataContext.Provider value={{ exercise, loading, error }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};