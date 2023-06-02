import React, { useEffect, useState } from "react";

const Photo = () => {
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
                            pages (where: {title: "Sobre mí"}){
                                nodes {
                                    featuredImage {node{mediaItemUrl}}
                                }
                            }
                        }
                        `,
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
        data !== null ? (
            (() => {
                const page = data.data.pages.nodes[0];
                return (
                    <img className="logo" src={page.featuredImage.node.mediaItemUrl} alt="logo.png" />
                );
            })()
        ) : (
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    );
};

export default Photo;