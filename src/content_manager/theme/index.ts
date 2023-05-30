export interface IColors {
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    light: string;
    dark: string;
  };
}

export const themeProvided = {
  harmony: {
    modal: {
      confirm: "#ff7f50",
      cancel: "#6d6e70",
    },
    timeline: {
      plusButton: "#ff7f50",
    },
    progressbar: "#ff7f50"
  },
  nbd: {
    modal: {
      confirm: "#ff7f50",
      cancel: "#6d6e70",
    },
    timeline: {
      plusButton: "#ff7f50",
    },
    progressbar: "#ff7f50"
  },
};

export const selectTheme = (theme: string) => {
  return themeProvided[theme];
};