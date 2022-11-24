import React from "react";
import { useHistory } from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import { useQualities } from "../hooks/useQualities";

const QualitiesListPage = () => {
    const { qualities } = useQualities();
    
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
