import { StyleSheet } from "react-native";

export const globalColors = {
  primary: "#7037eb",
  secondary: "#f72585",
  tertiary: "#3a0ca3",
  success: "#4cc9f0",
  warning: "#fca311",
  danger: "#e71d36",
  dark: "#2222eb",

  background: "#fff",
};

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: globalColors.background,
  },

  primaryButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: globalColors.background,
    fontSize: 18,
  },
});

export interface ThemeColors {
  primary: string;
  text: string;
  background: string;
  cardBackground: string;
  buttonTextColor: string;
}

export const colors: ThemeColors = {
  primary: "#592C00",
  text: "black",

  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",
};

export const lightColors: ThemeColors = {
  primary: "#592C00",
  text: "black",
  background: "#F3F2F7",
  cardBackground: "white",
  buttonTextColor: "white",
};

export const darkColors: ThemeColors = {
  primary: "#592C00",
  text: "white",

  background: "#090909",
  cardBackground: "#2d2d2d",
  buttonTextColor: "white",
};

export const globalStyless = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    // color: colors.text,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    // color: colors.text,
  },

  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: "rgba(0,0,0,0.3)",
    borderRadius: 10,
    // color: colors.text,
  },

  mainContainer: {
    flex: 1,
    // backgroundColor: colors.background,
  },
  globalMargin: {
    paddingHorizontal: 20,
    flex: 1,
  },

  btnPrimary: {
    // backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  btnPrimaryText: {
    // color: colors.text,
    fontSize: 16,
  },
});
