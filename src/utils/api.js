import axios from "axios";

const BASE_URL = "https://api.paraheights.com/edzy-api/hackathon";

// Health Check API
export const checkHealth = async () => {
  const response = await axios.get(`${BASE_URL}/health`);
  return response.data;
};

// Quiz Details API
export const fetchQuiz = async (examSubjectName, numberOfQuestions) => {
  const response = await axios.post(`${BASE_URL}/task/quizDetails`, {
    examSubjectName,
    numberOfQuestions,
  });

  return response.data.data;
};
