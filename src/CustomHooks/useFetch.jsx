// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

// // Custom hook for fetching and sending data
// const useFetch = ({
//   url,
//   queryKey,
//   method = "GET",
//   options = {},
//   data = null,
//   params = {},
// }) => {
//   // Fetcher function
//   const fetcher = async (paramsByMutate) => {
//     let finalParams = params;
//     if (paramsByMutate) {
//       finalParams = paramsByMutate.params || finalParams;
//     }

//     const token = JSON.parse(localStorage.getItem("token"));

//     // Create FormData if data is provided and method is POST or PUT
//     let requestData = data instanceof FormData ? data : null;

//     if (!requestData) {
//       requestData = new FormData();

//       // Append data fields to FormData
//       if (data) {
//         Object.keys(data).forEach((key) => {
//           console.log(key, data[key]);
//           requestData.append(key, data[key]);
//         });
//       }
//     }

//     const response = await axios({
//       method,
//       url,
//       data: requestData,
//       params: finalParams,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         ...(requestData instanceof FormData
//           ? { "Content-Type": "multipart/form-data" }
//           : {}),
//       },
//     });

//     // console.log(response.data);
//     return response.data;
//   };

//   // Use `useQuery` for GET requests
//   const query = useQuery({
//     queryKey,
//     queryFn: fetcher,
//     ...options,
//     enabled: method === "GET", // Only run for GET requests
//   });

//   // Use `useMutation` for non-GET requests (POST, PUT, DELETE)
//   const mutation = useMutation({ mutationFn: fetcher });

//   // Return the appropriate result
//   return method === "GET" ? query : mutation;
// };

// export default useFetch;
/// New Code Below

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Custom hook for fetching and sending data
const useFetch = ({
  url,
  queryKey,
  method = "GET",
  options = {},
  data = null,
  params = {},
}) => {
  // Fetcher function
  const fetcher = async (paramsByMutate) => {
    let finalParams = params;
    if (paramsByMutate) {
      finalParams = paramsByMutate.params || finalParams;
    }

    const token = JSON.parse(localStorage.getItem("token"));

    // Create FormData if data is provided and method is POST or PUT
    let requestData = null;
    if (method === "POST" || method === "PUT") {
      requestData = new FormData();

      if (data) {
        Object.keys(data).forEach((key) => {
          const value = data[key];
          if (value instanceof FileList) {
            // If the value is a FileList, append each file (for multiple images)
            Array.from(value).forEach((file) => {
              requestData.append(key, file);
            });
          } else if (Array.isArray(value)) {
            // If the value is an array (for multiple images or other data)
            value.forEach((item) => {
              requestData.append(key, item);
            });
          } else {
            // Append regular fields to FormData
            requestData.append(key, value);
          }
        });
      }
    }

    const response = await axios({
      method,
      url,
      data: requestData || data,
      params: finalParams,
      headers: {
        Authorization: `Bearer ${token}`,
        ...(requestData instanceof FormData
          ? { "Content-Type": "multipart/form-data" }
          : {}),
      },
    });

    return response.data;
  };

  // Use `useQuery` for GET requests
  const query = useQuery({
    queryKey,
    queryFn: fetcher,
    ...options,
    enabled: method === "GET", // Only run for GET requests
  });

  // Use `useMutation` for non-GET requests (POST, PUT, DELETE)
  const mutation = useMutation({ mutationFn: fetcher });

  // Return the appropriate result
  return method === "GET" ? query : mutation;
};

export default useFetch;
