import React from "react";

import "./style.scss";

const ContentWrapper = ({ children }) => {
    return <div className="contentWrapper">{children}</div>;            //ye bss jo isme children pass hoga chahe wo div ho 
                                                                        //ya component ho use wrap krega and iski css us children ko 
                                                                        //centre pe le aaegi ye bhut zyda repetitive cheez krni thi isliye
                                                                        //hmne iska seperate component hi bna diya
};

export default ContentWrapper;
