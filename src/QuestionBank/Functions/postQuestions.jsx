import axios from "axios";
const postQuestions = async (
  courseName,
  courseCode,
  department,
  year,
  trimester,
  examType,
  pdf
) => {
  const form = new FormData();
  form.append("courseName", courseName);
  form.append("courseCode", courseCode);
  form.append("department", department);
  form.append("year", year);
  form.append("trimester", trimester);
  form.append("examType", examType);
  form.append("pdf", pdf[0]);
  const token = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await axios.post(
      `http://localhost:3000/questions/postquestion/`,
      form,
      {
        headers: {
          Authorization: "Baerer " + token,
        },
      }
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

const updateQuestions = async (
  id,
  courseName,
  courseCode,
  department,
  year,
  trimester,
  examType
) => {
  const form = new FormData();

  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.put(
    `http://localhost:3000/questions/updatequestion/`,
    { id, courseName, courseCode, department, year, trimester, examType },
    {
      headers: {
        Authorization: "Baerer " + token,
      },
    }
  );

  return response;
};

export default postQuestions;
export { updateQuestions };
