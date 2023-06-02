import React, { useEffect, useState } from "react";

// funcion que toma una cadena de texto y elimina los divs que encuentre y su contenido 
function cleanParagraph(content) {
    const withoutDiv = content.replace(/<div[^>]*>.*?<\/div>/gi, "");
    const cleanedContent = withoutDiv.trim();
    return cleanedContent;
}

const MeComponent = () => {
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
                                    id
                                    content
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
                console.log(page);
                return (
                    <div className="container" key={page.id}>
                        <div className="content" dangerouslySetInnerHTML={{ __html: cleanParagraph(page.content) }}></div>
                        <img className="logo" src={page.featuredImage.node.mediaItemUrl} alt="logo.png" />
                    </div>
                );
            })()
        ) : (
            <p>"Cargando..."</p>
        )
    );
};

export default MeComponent;