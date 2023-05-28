import React from "react";

const card_styles = "flex flex-col w-9/12 md:w-80 lg:w-96";
const img_styles = "w-full";
const content_styles = "flex flex-col justify-between p-4";
const title_styles = "text-2xl font-bold";
const btns_styles = "flex flex-row justify-between";
const btn_styles = "m-4";

const Card = ({ cardkey, title, featuredImage, repository, website }) => {
    return (
        <div key={cardkey} class={card_styles}>
            <div class={img_styles}>
                <img src={featuredImage.node.mediaItemUrl} alt="" />
            </div>
            <div class={content_styles}>
                <h3 class={title_styles}>{title}</h3>
                <div class={btns_styles}>
                    <a href={repository} class={btn_styles}>Repository</a>
                    <a href={website} class={btn_styles}>Website</a>
                </div>
            </div>
        </div>
    );
}

export default Card;