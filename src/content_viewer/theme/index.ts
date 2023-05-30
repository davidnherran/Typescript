export const themeProvided = {
  harmony: {
    navbar: {
      background: "transparent",
      borderRadius: "none",
      fontSize: "18",
    },
    controls: {
      background: "transparent",
      borderRadius: "none",
    }
  },
  nbd: {
    navbar: {
      background: "linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, #555555 100%)",
      borderRadius: "0px 0px 17px 17px",
      fontSize: "22",
    },
    controls: {
      background: "linear-gradient(180deg, rgba(53, 53, 53, 0.05) 0%, #353535be 74%)",
      borderRadius: "15px 15px 0px 0px",
    }
  },
}; 

export const selectTheme = (theme: string) => {
  return themeProvided[theme];
};
