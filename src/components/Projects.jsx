import React, { useEffect, useState } from "react";
import Card from "./Card.jsx";

const ProjectsComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("https://blog.marcobardalesrodriguez.site/graphql", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        query: `
                        query {
                            posts (where: {categoryName: "projects"}){
                                nodes {
                                id
                                title
                                repository
                                website
                                featuredImage {node{mediaItemUrl}}
                              }
                          }
                        }`
                    }),
                });
                const responseData = await response.json();
                setData(responseData);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {data !== null ? (
                data.data.posts.nodes.map((item) => (
                    <Card
                        key={item.id} // Asignar el campo "id" como la prop "key" de Card para que React pueda identificar cada componente
                        cardkey={item.id} // Asignar el campo "id" como la prop "cardkey" que usara el componente Card.jsx como key interna
                        title={item.title}
                        featuredImage={item.featuredImage}
                        repository={item.repository}
                        website={item.website}
                    />
                ))
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default ProjectsComponent;