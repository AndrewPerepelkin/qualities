import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const useQualities = () => useContext(QualitiesContext);

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => { 
      try {
        const {content} = await qualityService.fetchAll()
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        errorCatcher(error);
      }
    }
    getQualities();
  }, [])

  const getQuality = (id) => qualities.find(q => q._id === id);

  const updateQuality = async ({_id: id, ...data}) => {
    try {
      const { content } = await qualityService.update(id, data);
      setQualities(prevState => prevState.map(q => q._id === content._id ? content : q))
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const addQuality = async (data) => {
    try {
      const { content } = await qualityService.create(data);
      setQualities(prevState => [...prevState, content])
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const deleteQuality = async (id) => {
    try {
      const { content } = await qualityService.delete(id);
      setQualities(prevState => prevState.filter(q => q._id !== content._id))
      return content;
    } catch (error) {
      errorCatcher(error);
    }
  };

  const errorCatcher = (error) => {
    const {message} = error.response.data;
    setError(message);
  } 
    
  useEffect(() => {
    toast.error(error);
    setError(null);
  }, [error])

 return <QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality, deleteQuality}}>
          {!isLoading ? children : <h1>Qualities loading...</h1>}
        </QualitiesContext.Provider>
};