import { gql } from "@apollo/client";

export const GET_CONTENT_BY_ID = gql`
  query getContent($ID: ID!) {
    getContent(ID: $ID) {
      ID
      NAME
      DESCRIPTION
      CATEGORY
      COVER
      CLIENT_ID
      SEGMENTS {
        ID
        NAME
        SEGMENT_TYPE
        START
        END
        ORDER
        FILE
        TAG
        THUMBNAIL
        SEGMENT_PARENT
      }
    }
  }
`;