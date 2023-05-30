export const themeProvided = {
  harmony: {
    sidebar: {
      background: "#4c4c4c",
      width: "26vw",
      paddingLeft: "0px"
    },
    wrapper: {
      background: "#fffcf0"
    },
    searchbar: {
      background: "transparent",
      border: "solid 1px #c4c4c4",
      color: "#333333"
    },
    cover: {
      color: "#333"
    },
    button: {
      background: "#4c4c4c",
      color: "#fff"
    }
  },
  nbd: {
    sidebar: {
      background: "#4c4c4c",
      width: "calc(22vw + 60px)",
      paddingLeft: "60px"
    },
    wrapper: {
      background: "#999999"
    },
    searchbar: {
      background: "#4c4c4c",
      border: "none",
      color: "#ffffff"
    },
    cover: {
      color: "#fff"
    },
    button: {
      background: "#F7DB6B",
      color: "#333333"
    }
  },
};

export const selectTheme = (theme: string) => {
  return themeProvided[theme];
};