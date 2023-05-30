export const getSegmentsQuerie = `
query getAllSegments {
  getAllSegments {
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
}`;

export const getContentsQuerie = `
  query getAllContents {
    getAllContents {
      ID
      NAME
      DESCRIPTION
      CATEGORY
      COVER
      CLIENT_ID
    }
  }
`;