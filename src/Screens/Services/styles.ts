import {StyleSheet} from 'react-native';
import {scale as s, textScale as t} from '../../styles/responsiveSize';
import f from '../../styles/typography';
export default StyleSheet.create({
  content: {padding: s(16), paddingBottom: s(120)},
  title: {
    fontSize: t(35),
    fontFamily: f.bold,
    color: '#eee',
    marginTop: s(9),
    marginBottom: s(26),
  },
  subtitle: {
    fontSize: t(21),
    fontFamily: f.bold,
    color: '#eee',
    marginBottom: s(30),
  },
});
