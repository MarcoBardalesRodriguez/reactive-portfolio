import React, { useEffect, useState } from "react";

const ProjectsComponent = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const api = 'https://portfolio.apps.marcobardalesrodriguez.site/api/'
        const endpoint = api + 'collections/projects/records'

        const fetchData = async () => {
            try {
                const response = await fetch(endpoint, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': sessionStorage.getItem('token')
                    }
                });

                const data = await response.json();

                console.log(data);

                // return data
                setData(data.items);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    return (
        data !== null ? (
            <>
                <div className="projects">
                    {data.map((project) => (
                        <div className="project row mb-3" key={project.id}>
                            <div className="content col-sm-7">
                                <h2 className="h2">{project.title}</h2>
                                <div className="buttons d-flex mt-3">
                                    <button type='button' className="button-option">
                                        <a href={project.repository_url}>Repositorio</a>
                                    </button>
                                    <button type='button' className="button-option">
                                        <a href={project.app_url}>App</a>
                                    </button>
                                    <button type="button" class="button-option" data-toggle="modal" data-target={'.modal-lg-' + project.id}>
                                        Detalles
                                        <i class="fa fa-share-square-o text-white ml-2" aria-hidden="true"></i>
                                    </button>
                                </div>

                            </div>
                            <img className="col-sm-5" src={'https://portfolio.apps.marcobardalesrodriguez.site/api/files/projects/' + project.id + '/' + project.featured_image} alt="" />
                            {/* <!-- Large modal --> */}

                            <div className={`modal fade modal-lg-${project.id}`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                <div class="modal-dialog modal-lg">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title">Detalles: {project.title}</h5>
                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                <span className="text-white" aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div class="modal-body">
                                            <p>Modal body text goes here.</p>
                                            <p dangerouslySetInnerHTML={{ __html: project.description }}></p>
                                            <p>
                                                {project.skills.map((skill, index) => (
                                                    <p key={index}>{skill}</p>
                                                ))}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                </div >
            </>
        ) : (
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
        )
    );
};

export default ProjectsComponent;