import React from "react";

const Card = ({ cardkey, title, featuredImage, repository, website }) => {
    return (
        <div key={cardkey} className="card">
            <div className="card__image">
                <img src={featuredImage.node.mediaItemUrl} alt="" />
            </div>
            <div className="card__content">
                <h3>{title}</h3>
                <div className="card__links">
                    <a href={repository}>Repository</a>
                    <a href={website}>Website</a>
                </div>
            </div>
        </div>
    );
}

export default Card;