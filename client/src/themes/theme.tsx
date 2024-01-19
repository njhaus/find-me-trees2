import { extendTheme } from "@chakra-ui/react"

import { defineStyleConfig } from "@chakra-ui/react";

const Button = defineStyleConfig({
  // The styles all button have in common
  baseStyle: {
    borderRadius: "0", // <-- border radius is same for all variants and sizes
  },
  // Two sizes: sm and md
  sizes: {
    sm: {
      fontSize: "sm",
      px: 4, // <-- px is short for paddingLeft and paddingRight
      py: 3, // <-- py is short for paddingTop and paddingBottom
    },
    md: {
      fontSize: "md",
      px: 6, // <-- these values are tokens from the design system
      py: 4, // <-- these values are tokens from the design system
    },
  },
  variants: {
    outlineLight: {
      border: "2px solid rgb(236, 242, 248)",
      color: "rgb(236, 242, 248)",
      backgroundColor: "transparent",
      padding: "0rem 1rem 0rem 1rem",
    },
    outlineDark: {
      border: "2px solid rgb(23,48,26)",
      color: "rgb(23,48,26)",
      backgroundColor: "transparent",
      padding: "0rem 1rem 0rem 1rem",
    },
    solidDark: {
      fontSize: "1rem",
      backgroundColor: "secondary.200",
      color: "white",
    },
    solidLight: {
      fontSize: "1rem",
      backgroundColor: "main.900",
      color: "secondary.100",
    },
    login: {
      textTransform: "uppercase",
      fontSize: "0.9rem",
      backgroundColor: "secondary.200",
      color: "white",
    },
    icon: {
      padding: "0rem",
      aspectRatio: "1/1",
      fontWeight: "bold",
      border: "1px solid",
      borderRadius: "50%",
    },
    transparent: {
      backgroundColor: 'transparent',
      color: 'secondary.100'
    }
  },
  // The default size and variant values
  defaultProps: {
    size: "md",
    variant: "solidLight",
  },
});

const Text = defineStyleConfig({
  variants: {
    smallCaps: {
      fontSize: '0.9rem',
      textTransform: 'uppercase',
      fontWeight: '600',
    }
  }
})


const theme = extendTheme({
  components: {
    Button,
    Text
  },
  colors: {
    main: {
      100: "rgb(20,28,22)",
      200: "rgb(37,45,37)",
      300: "rgb(55,64,56)",
      400: "rgb(76,86,77)",
      500: "rgb(100,111,100)",
      600: "rgb(125,137,126)",
      700: "rgb(153,164,153)",
      800: "rgb(182,195,181)",
      900: "rgb(213,226,212)",
      950: "rgb(229,242,227)",
      990: "rgb(242,253,241)",
    },
    secondary: {
      100: "rgb(2,30,10)",
      200: "rgb(23,48,26)",
      300: "rgb(41,69,41)",
      400: "rgb(60,91,60)",
      500: "rgb(83,116,83)",
      600: "rgb(108,143,106)",
      700: "rgb(134,171,131)",
      800: "rgb(162,202,158)",
      900: "rgb(192,233,187)",
      950: "rgb(207,250,203)",
      990: "rgb(243,255,241)",
    },
    accent: {
      100: "rgb(44,18,33)",
      200: "rgb(68,40,54)",
      300: "rgb(90,60,75)",
      400: "rgb(118,84,101)",
      500: "rgb(144,108,126)",
      600: "rgb(171,134,151)",
      700: "rgb(200,160,178)",
      800: "rgb(228,187,205)",
      900: "rgb(255,213,234)",
      950: "rgb(255,234,243)",
    },
    neutral: {
      100: "rgb(0,0,0)",
      200: "rgb(0,0,0)",
      300: "rgb(0,0,0)",
      400: "rgb(0,0,0)",
      500: "#fffdd0",
      600: "rgb(0,0,0)",
      700: "rgb(0,0,0)",
      800: "rgb(0,0,0)",
      900: "rgb(0,0,0)",
    },
    light: "white",
    dark: "black",
  },
  fonts: {
    main: `"Montserrat", Verdana, sans-serif`,
    display: `'Kaushan Script', cursive`,
  },
});

export default theme;
