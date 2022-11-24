import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import QualityForm from "../components/ui/qualityForm";
import qualityService from "../services/qualityService";


const EditQualityPage = () => {
    const id = useParams().id;
    const [quality, setQualitity] = useState(null);

    const getQuality = async (id) => {
        try {
            const data = await qualityService.get(id);
            return data.content; 
        } catch ({response}) {
            toast.error(response.data.message);
        }
    }
    
    const updateQuality = async (id, content) => {
        try {
            const data = await qualityService.update(id, content);
            return data.content;
        } catch (error) {
            const { message } = error.response.data;
            toast.error(message);
        }
    }

    useEffect(() => {
        getQuality(id).then(data => setQualitity(data));
    }, []);

    const handleSubmit = (data) => {
        updateQuality(id, data);
    }

        return (
            <>
                <h1>Edit Quality Page</h1>{" "} {quality !== null ? <QualityForm data={quality} onSubmit={handleSubmit} /> : "Loading..."}
            </>
        );
    };

export default EditQualityPage;
