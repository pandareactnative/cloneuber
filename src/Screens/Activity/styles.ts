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
  empty: {alignItems: 'center', gap: s(15), paddingVertical: s(80)},
  emptyTitle: {color: '#eee', fontSize: t(22), fontFamily: f.bold},
});
