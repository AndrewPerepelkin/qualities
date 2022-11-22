import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditForm from "../components/ui/editForm";

const EditQualityPage = () => {
    const id = useParams().id;
    const QUALITY_END_POINT = `http://localhost:4000/api/v1/quality/${id}`;
    const [quality, setQualitity] = useState(null);

    useEffect(async () => {
        const { data } = await axios.get(QUALITY_END_POINT);
        setQualitity(data.content);
    }, [])

    const handleSubmit = async (data) => {
        try {
           await axios.put(QUALITY_END_POINT, data).then(res => console.log(res.data.content))
        } catch (error) {
            const expectedErrors = error.response && error.response.status >= 400 && error.response.status < 500;
            if (!expectedErrors) {
                console.log("Unexpected error");
            } else {
                console.log("Expected error");
            }
        }

     }

    return (
        <>
            <h1>Edit Quality Page</h1>{" "} {quality !== null ? <EditForm data={quality} onSubmit={handleSubmit} /> : "Loading..."}
        </>
    );
};

export default EditQualityPage;
