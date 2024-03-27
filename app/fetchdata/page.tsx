"use client"
import React, { useState, useEffect } from 'react';

interface Todo {
    userId: number;
    id: number;
    name: string;
    completed: boolean;
}

const Posts = () => {
    const [data, setData] = useState<Todo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h1 className='font-bold'>Data Fetch Using useEffect</h1>
            <ul>
                {data.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Posts;