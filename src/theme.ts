// 1. Import the extendTheme function
import { extendTheme, withDefaultProps } from '@chakra-ui/react'
// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  primary: {
    900: '#058373',
  },
}


export const theme = extendTheme(
   { colors},
    withDefaultProps({
      defaultProps: {
        variant: 'outline',
        size: 'lg',
        focusBorderColor: 'primary.900',
      },
      components: ['Input', 'NumberInput', 'PinInput','Button'],
    }),
  
  )

