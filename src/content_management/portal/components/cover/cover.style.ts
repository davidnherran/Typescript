import styled from "styled-components";

export const Coverage = styled.div`
  width: 152px;
  height: 90px;
  margin-bottom: 50px;
  margin-right: 24px;
  line-height: 18px;
  cursor: pointer;
  img {
    width: 152px;
    height: 90px;
    border-radius: 12px;
  }
`;

export const CoverTitle = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&display=swap');

  display: block;
  margin: 0;
  padding: 0;
  font-size: 16px;
  max-width: 152px;
  width: 152px;
  font-family: 'Open Sans', sans-serif;
  max-height: 50px;
  margin-right: 24px;
  text-align: center;
  color: ${({theme})=>theme.cover.color};
`;
