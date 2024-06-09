import React from "react";
import { useSearch } from "../../context/search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
   const [values, setValues] = useSearch();
   const navigate = useNavigate();

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const { data } = await axios.get(
            `/api/v1/product/search/${values.keyword}`
         );
         setValues({ ...values, results: data });
         navigate("/search");
      } catch (error) {
        
      }
   };

   return (
      <>
         <div className="col-md-5 my-auto">
            <form role="search" onSubmit={handleSubmit}>
               <div className="input-group">
                  <input
                     type="search"
                     placeholder="Search your product"
                     className="form-control"
                     value={values.keyword}
                     onChange={(e) =>
                        setValues({ ...values, keyword: e.target.value })
                     }
                  />
                  <button className="btn bg-white" type="submit">
                     <i className="fa fa-search" />
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};

export default SearchBar;
