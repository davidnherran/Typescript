import styled from "styled-components";

export const Searcher = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');
  font-family: 'Open Sans', sans-serif;
  img {
    position: absolute;
    transform: translate(14px, 18px);
  }
  input {    
    width: 438px;
    height: 49px;
    background-color: ${({theme}) => theme.searchbar.background};
    border-radius: 6px;
    margin-bottom: 24px;
    border: ${({theme}) => theme.searchbar.border};
    outline: none;
    color: ${({theme}) => theme.searchbar.color};
    padding-left: 40px;
    font-size: 16px;
  }
`;
