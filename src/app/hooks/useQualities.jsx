import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import qualityService from "../services/qualityService";

const QualitiesContext = React.createContext();

export const useQualities = () => useContext(QualitiesContext);

export const QualitiesProvider = ({ children }) => {
  const [qualities, setQualities] = useState([]);
  const [, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const getQualities = async () => { 
      try {
        const {content} = await qualityService.fetchAll()
        setQualities(content);
        setIsLoading(false);
      } catch (error) {
        errorCatching(error);
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
      errorCatching(error);
    }
  };

  const errorCatching = (error) => {
    const {message} = error.response.data;
    setError(message);
    toast.error(message);
   }

 return <QualitiesContext.Provider value={{qualities, getQuality, updateQuality}}>
          {!isLoading ? children : <h1>Qualities loading...</h1>}
        </QualitiesContext.Provider>
};