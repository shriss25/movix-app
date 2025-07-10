import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";            //ye library h iski documentation pd lena if smjhna h to ki kese use kre
import "react-lazy-load-image-component/src/effects/blur.css";

const Img = ({ src, className }) => {
    return (
        <LazyLoadImage
            className={className || ""}
            alt=""
            effect="blur"
            src={src}
        />
    );
};

export default Img;