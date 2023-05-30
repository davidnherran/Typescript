import { gql } from "@apollo/client";

export const CREATE_SEGMENT = gql`
  mutation createSegment(
    $NAME: String!
    $SEGMENT_TYPE: String!
    $START: Int!
    $END: Int!
    $ORDER: Int!
    $FILE: String!
    $TAG: String!
    $THUMBNAIL: String!
    $SEGMENT_PARENT: Int!
  ) {
    createSegment(
      NAME: $NAME
      SEGMENT_TYPE: $SEGMENT_TYPE
      START: $START
      END: $END
      ORDER: $ORDER
      FILE: $FILE
      TAG: $TAG
      THUMBNAIL: $THUMBNAIL
      SEGMENT_PARENT: $SEGMENT_PARENT
    ) {
      message
    }
  }
`;

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

export const DELETE_SEGMENT = gql`
  mutation deleteSegment($ID: ID!) {
    deleteSegment(ID: $ID) {
      message
    }
  }
`;

export const UPDATE_SEGMENT = gql`
  mutation updateSegment(
    $ID: ID!
    $NAME: String!
    $SEGMENT_TYPE: String!
    $START: Int!
    $END: Int!
    $ORDER: Int!
    $FILE: String!
    $TAG: String!
    $THUMBNAIL: String!
  ) {
    updateSegment(
      ID: $ID
      NAME: $NAME
      SEGMENT_TYPE: $SEGMENT_TYPE
      START: $START
      END: $END
      ORDER: $ORDER
      FILE: $FILE
      TAG: $TAG
      THUMBNAIL: $THUMBNAIL
    ) {
      message
    }
  }
`;

export const UPDATE_SEGEMENT_ORDER = gql`
  mutation updateSegment($ID: ID!, $ORDER: Int!) {
    updateSegment(ID: $ID, ORDER: $ORDER) {
      message
    }
  }
`;