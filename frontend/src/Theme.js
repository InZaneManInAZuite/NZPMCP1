import { createTheme } from '@mantine/core';

export const Theme = createTheme({

  components: {
    Button: {
        defaultProps: {
            color: 'blue',
      }
    },
    Title: {
        defaultProps: {
            order: 1,
            align: 'center',
            fw: 900,
        }
    },
    Anchor: {
        defaultProps: {
            ta: 'center',
            size: 'xs',
        }
    },
    
  },

  shadows: {
    md: '1px 1px 3px rgba(0, 0, 0, .25)',
    xl: '5px 5px 3px rgba(0, 0, 0, .25)',
  }
});


