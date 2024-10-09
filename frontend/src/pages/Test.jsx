import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Test = () => {
    const { course, testId } = useParams();
    const [testContent, setTestContent] = useState('');

    useEffect(() => {
        const fetchTestContent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/getTestContent', {
                    course: course,
                    testId: testId,
                });

                setTestContent(response.data.testContent);
            } catch (error) {
                console.error('Error fetching test content:', error);
            }
        };

        fetchTestContent();
    }, [course, testId]);

    return (
        <div className="test-container">
            <h1>{course} - {testId.toUpperCase()} Page</h1>
            <p>{testContent}</p>
        </div>
    );
};

export default Test;
