import React from "react";
import imge1 from "../images/img4.jpg";
import imge2 from "../images/img3.jpg";
import imge3 from "../images/img2.jpg";
import imge4 from "../images/img1.jpg";
import { Carousel } from "antd";
const Slider = () => {
   const contentStyle = {
      height: "240px",
      color: "#fff",
      lineHeight: "160px",
      textAlign: "center",
      background: "#364d79",
   };
   return (
      <Carousel autoplay>
         <div>
            <h3 style={contentStyle}>
               <img src={imge2} alt="" />
            </h3>
         </div>
         <div>
            <h3 style={contentStyle}>
               <img src={imge3} alt="" />
            </h3>
         </div>
         <div>
            <h3 style={contentStyle}>
               <img src={imge4} alt="" />
            </h3>
         </div>
         <div>
            <h3 style={contentStyle}>
               <img src={imge1} alt="" />
            </h3>
         </div>
      </Carousel>
   );
};

export default Slider;
