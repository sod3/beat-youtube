import React, { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

const theme = {
  light: {
    text: "#333",
    background: "#f9f9f9",
    primary: "#007BFF",
  },
  dark: {
    text: "#f9f9f9",
    background: "#333",
    primary: "#1E90FF",
  },
};

const Container = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: ${({ theme }) => theme.background};
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 2em;
  @media (max-width: 768px) {
    font-size: 1.5em;
  }
`;

const Question = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: pink;
  color: ${({ theme }) => theme.text};
  padding: 15px;
  font-size: 1.2em;
  margin-top: 10px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: darken(${({ theme }) => theme.primary}, 10%);
  }
  @media (max-width: 768px) {
    font-size: 1em;
    padding: 10px;
  }
`;

const Answer = styled.div`
  background-color: lighten(${({ theme }) => theme.primary}, 20%);
  color: ${({ theme }) => theme.text};
  padding: 15px;
  font-size: 1em;
  margin-top: 5px;
  border-radius: 5px;
  border-left: 5px solid ${({ theme }) => theme.primary};
  transition: max-height 0.3s ease, padding 0.3s ease;
  overflow: hidden;
  @media (max-width: 768px) {
    font-size: 0.9em;
    padding: 10px;
  }
`;

const questionsAndAnswers = [
  {
    question: "How to upload a video?",
    answer:
      "To upload a video, click on the 'Upload' button on the top right corner of the homepage. Then follow the instructions to select and upload your video.",
  },
  {
    question: "How to change my password?",
    answer:
      "Go to your account settings by clicking on your profile picture. In the 'Account' section, you can change your password.",
  },
  {
    question: "How to subscribe to a channel?",
    answer:
      "Visit the channel you want to subscribe to and click on the 'Subscribe' button below the channel name.",
  },
  {
    question: "How can I delete a video",
    answer:
      "Go to your Dashboard page in usermenu which on clicking userpicture, select the video, and click the Delete option.",
  },
  {
    question: "Is there a limit to the number of videos I can upload?",
    answer:
      "Currently, there is no limit to the number of videos you can upload.",
  },
  {
    question: "Can I edit the title and description of my videos after uploading?",
    answer:
      "Yes, you can edit the title and description of your videos in Dashboard page in usermenu which on clicking userpicture, select the video, and click the Delete option.",
  },
  {
    question: "What should I do if I encounter a technical issue?",
    answer:
      "Contact our support team through the ContactUs page in menu.",
  },
  {
    question: "How to enable dark mode?",
    answer:
      "In the menu, click on the 'Dark Mode' option to toggle between light and dark modes.",
  },
];

const Help = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleQuestionClick = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <ThemeProvider theme={theme.light}>
      <Container>
        <Title>Help & FAQ</Title>
        {questionsAndAnswers.map((qa, index) => (
          <div key={index}>
            <Question onClick={() => handleQuestionClick(index)}>
              <span>{qa.question}</span>
              {openIndex === index ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </Question>
            {openIndex === index && <Answer>{qa.answer}</Answer>}
          </div>
        ))}
      </Container>
    </ThemeProvider>
  );
};

export default Help;
