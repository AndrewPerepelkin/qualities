import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";
import httpServices from "../services/httpServices";


const EditQualityPage = () => {
    
    const id = useParams().id;
    const QUALITY_END_POINT = `quality/${id}`;
    const [quality, setQualitity] = useState(null);

    useEffect(async () => {
        const { data } = await httpServices.get(QUALITY_END_POINT);
        setQualitity(data.content);
    }, [])

    const handleSubmit = async (data) => {
        try {
           await httpServices.put(QUALITY_END_POINT, data).then(res => console.log(res.data.content))
        } catch (error) {
            console.log("Expected error");
        }
     }

    return (
        <>
            <h1>Edit Quality Page</h1>{" "} {quality !== null ? <EditForm data={quality} onSubmit={handleSubmit} /> : "Loading..."}
        </>
    );
};

export default EditQualityPage;
