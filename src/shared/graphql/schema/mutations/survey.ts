import { gql } from "@apollo/client";

export const CREATE_SURVEY = gql`
  mutation createSurvey(
    $SEGMENT_ID: Int!
    $QUESTION: String!
    $ANSWER: String!
    $IS_CORRECT: Boolean!
  ) {
    createSurvey(
      SEGMENT_ID: $SEGMENT_ID
      QUESTION: $QUESTION
      ANSWER: $ANSWER
      IS_CORRECT: $IS_CORRECT
    ) {
      message
    }
  }
`;
