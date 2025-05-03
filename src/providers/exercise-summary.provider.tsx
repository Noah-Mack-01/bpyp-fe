import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Exercise, ExerciseSummary } from "../data/exercise";

interface UserByIdProps {
  uId: string;
  children: React.ReactNode;
}

interface ExerciseSummaryContextType {
  exercise?: ExerciseSummary[] | null;
  loading: boolean;
  error?: string | null;
}

const ExerciseSummaryContext = createContext<ExerciseSummaryContextType | undefined>(undefined);

export const ExerciseDetailProvider: React.FC<UserByIdProps> = ({ uId, children }) => {
  const [exercise, setExercise] = useState<ExerciseSummary[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://stub-backend.com/api/v1/users/exercises?user=${uId}&past=${5}`);
        setExercise(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

      fetchData();
  }, [uId]);
  return (
    <ExerciseSummaryContext.Provider value={{ exercise: exercise, loading, error }} children={children}/>
  );
};

export const getExerciseSummaryDetail = (): ExerciseSummaryContextType => {
  const context = useContext(ExerciseSummaryContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};