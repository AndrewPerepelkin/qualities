import React, {useState, useEffect} from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import QualitiesTable from "../components/ui/qualitiesTable";
import qualityService from "../services/qualityService";

const QualitiesListPage = () => {
    const [qualities, setQualities] = useState([]);

    const getQualities = async () => { 
        try {
            const data = await qualityService.fetchAll();
            return data.content;
        } catch ({response}) {
            toast.error(response.data.message);
        }
     }

    useEffect(() => {
        getQualities().then(data => setQualities(data));        
    }, []);

    const history = useHistory();
    const handleEdit = (param) => {
        history.push(`/edit/${param}`);
    };
    const handleDelete = (param) => {
        console.log(param);
    };
    return (
        <>
            <h1>Qualities List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
