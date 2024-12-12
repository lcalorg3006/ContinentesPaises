import { Appearance } from 'react-native';

const colorScheme = Appearance.getColorScheme();

const styles = {
  container: {
    backgroundColor: colorScheme === 'dark' ? 'black' : 'white',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colorScheme === 'dark' ? 'white' : 'black',  // Cambiar el color del texto según el modo
    fontSize: 20,
    textAlign: 'center',
  },
};

export default styles;
