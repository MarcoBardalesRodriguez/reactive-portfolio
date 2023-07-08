import React, { useEffect, useState } from "react";

const Me = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const api = 'https://portfolio.apps.marcobardalesrodriguez.site/api/'
        const endpoint = api + 'collections/about_users/records'
        const fetchData = async () => {
            try {
                const response = await fetch(endpoint, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": sessionStorage.getItem("token")
                    }
                });
                const data = await response.json();
                console.log(data);
                setData(data.items[0]);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        data !== null ? (
            <>
                <div className="container">
                    <div className="content" dangerouslySetInnerHTML={{ __html: data.description}}>
                        {/* {data.description} */}
                    </div>
                </div>
            </>
        ) : (
            <p>Cargando...</p>
        )
    );
};

export default Me;