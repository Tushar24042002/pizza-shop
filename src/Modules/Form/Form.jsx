import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrder } from "./FormSlice";
import { useNavigate } from "react-router";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formColumn, setFormColumn] = useState([
    {
      tag: "select",
      name: "type",
      label: "Pizza Type",
      options: [
        {
          id: 1,
          name: "Veg",
        },
        {
          id: 2,
          name: "Non-Veg",
        },
      ],
    },
    {
      tag: "select",
      name: "size",
      label: "Pizza Size",
      options: [
        {
          id: 1,
          name: "Large",
        },
        {
          id: 2,
          name: "Medium",
        },
        {
          id: 3,
          name: "Small",
        },
      ],
    },
    {
      tag: "select",
      name: "base",
      label: "Pizza Base",
      options: [
        {
          id: 1,
          name: "Thin",
        },
        {
          id: 2,
          name: "Thick",
        },
      ],
    },
  ]);

  const [formData, setFormData] = useState({
    stage: 1,
    type: "",
    base: "",
    size: ""
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((e) => ({
      ...e,
      creationTime: new Date().toISOString(),
      fixedTime :  new Date().toISOString(),
      [name]: value,
    }));
  };

const clearForm=()=>{
  alert("Order Created Successfully");
  setFormData({stage : 1,
  type :"",
  base : "",
  size : ""
  });
}


  const handleSubmit = () => {
    dispatch(addOrder(formData));
    clearForm();
  };

  return (
    <div className="container-fluid pt-3 pb-5">
      <div className="row">
        <div className="col-lg-5  mx-auto">
          <div className="card p-4">
            <div className="card-body">
              <form>
                <div className="heading">
                  <h2 className="text-center text-danger">Pizza Form</h2>
                </div>
                {formColumn?.map((data, index) => (
                  <div className="form-group mb-3" key={index}>
                    <label htmlFor={data?.name}>{data?.label}</label>
                    <select
                        className="form-control form-select"
                        id={data?.name}
                        name={data?.name}
                        onChange={handleForm}
                        value={formData[data?.name]}
                      >
                        <option key="default" value={""}>
                          Select {data?.label}
                        </option>
                        {data?.options?.map((subData, subIndex) => (
                          <option value={subData?.name} key={subIndex}>
                            {subData?.name}
                          </option>
                        ))}
                      </select>
                  </div>
                ))}
                <div className="btn-group w-100 mt-4">
                  <button
                    type="button"
                    className="btn btn-success w-100"
                    onClick={handleSubmit}
                  >
                    Submit Form
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
