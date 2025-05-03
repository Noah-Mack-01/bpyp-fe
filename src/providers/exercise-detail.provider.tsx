import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Exercise } from "../data/exercise";

interface ExerciseByIdProps {
  uId: string;
  eId: string;
  children: React.ReactNode;
}

interface ExerciseContextType {
  exercise?: Exercise | null;
  loading: boolean;
  error?: string | null;
  submit: (exercise: Exercise) => Promise<void>
}

const ExerciseDetailContext = createContext<ExerciseContextType | undefined>(undefined);

export const ExerciseDetailProvider: React.FC<ExerciseByIdProps> = ({ uId, eId, children }) => {
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`https://stub-backend.com/api/v1/exercise?user=${uId}&exercise=${eId}`);
        setExercise(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uId,eId]);

  const submit = async (newExercise: Exercise) => {
    setLoading(true);
    setError(null);
    try {
      const method = (!!exercise)? axios.put : axios.post;
      const response = await method(`https://stub-backend.com/api/v1/exercise?user=${uId}&exercise=${eId}`, exercise, {})
    } catch (err: any) {
      setError("Invalid PUT on ")
    }
  }

  return (
    <ExerciseDetailContext.Provider value={{ exercise: exercise, loading, error, submit: submit}} children={children}/>
  );
};

export const getExerciseDetail = (): ExerciseContextType => {
  const context = useContext(ExerciseDetailContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};