export const content = [
  {
    ID: "101",
    NAME: "Pollo apanado sin gluten",
    DESCRIPTION: "Microaprendizajes del taller de negociación",
    CATEGORY: "Microaprendizajes",
    COVER:
      "https://akelabbucket.s3.us-east-1.amazonaws.com/file-1669064243828.png",
    CLIENT_ID: 1,
    SEGMENTS: [
      {
        ID: "21",
        NAME: "Intro",
        SEGMENT_TYPE: "RCM",
        START: 0,
        END: 30,
        ORDER: 0,
        FILE: '<h1 style="text-align: center;"><br></h1><h1 style="text-align: center;"><span style="color: rgb(255, 153, 0);">Pollo apanado sin gluten</span></h1><p style="text-align: center;">Estoy {CIUDAD}</p><p style="text-align: center;"><br></p><p style="text-align: center;"><br></p>',
        TAG: "*",
        THUMBNAIL: "EMPTY",
        SEGMENT_PARENT: 101,
      },
      {
        ID: "22",
        NAME: "Preparacion",
        SEGMENT_TYPE: "VIDEO",
        START: 0,
        END: 14,
        ORDER: 1,
        FILE: "https://content-management-mf.s3.amazonaws.com/POLLO+APANADO+SIN+FRITURAS+(1).mp4",
        TAG: "*",
        THUMBNAIL: "EMPTY",
        SEGMENT_PARENT: 101,
      },
      {
        ID: "2",
        NAME: "Resultado",
        SEGMENT_TYPE: "IMAGE",
        START: 0,
        END: 30,
        ORDER: 2,
        FILE: "https://content-management-mf.s3.amazonaws.com/ok.png",
        TAG: "*",
        THUMBNAIL: "EMPTY",
        SEGMENT_PARENT: 101,
      },
    ],
  }
];