import { gql } from "@apollo/client";

export const CREATE_CONTENT = gql`
  mutation createContent(
    $NAME: String!
    $DESCRIPTION: String!
    $CATEGORY: String!
    $COVER: String!
  ) {
    createContent(
      NAME: $NAME
      DESCRIPTION: $DESCRIPTION
      CATEGORY: $CATEGORY
      COVER: $COVER
    ) {
      message,
      id
    }
  }
`;

export const DELETE_CONTENT = gql`
  mutation deleteContent($ID: Int!) {
    deleteContent(ID: $ID) {
      message
    }
  }
`;