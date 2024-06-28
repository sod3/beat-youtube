import React from "react";
import styled from "styled-components";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import MicOutlinedIcon from "@mui/icons-material/MicOutlined";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 25px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bg};
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 5px 10px;
    border-radius: 20px;
  }
`;

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  color: ${({ theme }) => theme.text};
  width: 100%;
  padding: 5px;

  @media (max-width: 768px) {
    padding: 5px 0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const Search = ({ query, setQuery }) => {
  const navigate = useNavigate();

  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setQuery(transcript);
      navigate(`/search?q=${transcript}`);
    };
    recognition.start();
  };

  return (
    <Container>
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconContainer>
        <SearchOutlinedIcon onClick={() => navigate(`/search?q=${query}`)} />
        <MicOutlinedIcon onClick={handleVoiceSearch} />
      </IconContainer>
    </Container>
  );
};

export default Search;
