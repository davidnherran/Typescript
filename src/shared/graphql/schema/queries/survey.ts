import { gql } from "@apollo/client";

export const GET_ALL_SURVEYS = gql`
  query getAllSurveys{
    getAllSurveys {
      ID
      SEGMENT_ID
      QUESTION
      ANSWER
      IS_CORRECT
    }
  }
`;