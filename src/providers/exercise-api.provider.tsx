import React, { createContext, useState, useEffect, useContext } from 'react';
import { Alert } from 'react-native';
import { ExerciseContext } from '../data/exercise';
import { exerciseAPI } from '../api/exercise';
import { useAuth } from './auth.provider';
import { supabaseAPI } from '../api/supabase';

const ExerciseApiContext = createContext(null as  ExerciseContext | null);

export const ExerciseProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<any | null>(null)

  function methodWrapper<T>(func: (...obj: any[]) => Promise<any>): (...obj: any[]) => Promise<any> {  
    return async (...obj: any[]) => {
      console.log(obj);
      setIsLoading(true);
      setError(null);
      try {
        return await func(...obj??[]);
      } catch (err) {
        setError(err);
        console.error(`${func.name} failed`, err);
      } finally {
        setIsLoading(false);
      }
    }
  }

  const exerciseContext: ExerciseContext = {
    loading: isLoading,
    error: error,
    getExercise: methodWrapper(exerciseAPI.getExercise),
    createNewExercise: methodWrapper(exerciseAPI.createNewExercise),
    getStructure: methodWrapper(exerciseAPI.getStructuredExercise),
    getAllExercises: methodWrapper(supabaseAPI.getSummary)
  }

  return (
    <ExerciseApiContext.Provider value={exerciseContext}>
      {children}
    </ExerciseApiContext.Provider>
  );
};

// Custom hook for easy access to auth context
export const useExerciseApi = () => {
  const context = useContext(ExerciseApiContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}