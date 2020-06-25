import React from 'react';
import { useParams } from 'react-router-dom';

const EditIssue = props => {
    const { id } = useParams();
    return (
        <h2>
            {`This is a placeholder for editing issue # ${id}`}
        </h2>
    ) 
}

export default EditIssue;