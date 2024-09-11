import { useState, useReducer, useEffect } from "react";

const useInput = (initialState) => {
  const formReducer = (state, action) => {
    switch (action.type) {
      case "CHANGE": {
        return {
          ...state,
          [action.name]: {
            value: action.value,
            isValid: action.value === "" ? false : true,
          },
        };
      }
      case "IMAGE": {
        return {
          ...state,
          image: action.value,
        };
      }

      default: {
        return state;
      }
    }
  };

  const updateImage = (value) => {
    const dataTransfer = new DataTransfer();
    value.forEach((file) => {
      dataTransfer.items.add(file);
    });
    dispatch({ type: "IMAGE", value: dataTransfer.files });
  };

  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;

    dispatch({
      type: "CHANGE",
      name: name,
      value: value,
    });
  };

  const uploadImage = (event) => {
    const { files } = event.target;
    dispatch({ type: "IMAGE", value: files });
  };

  return { state, handleChange, uploadImage, updateImage };
};
export { useInput };
