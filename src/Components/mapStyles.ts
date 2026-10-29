import {StyleSheet} from 'react-native';
export default StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
    backgroundColor: '#505966',
  },
  routeCanvas: {...StyleSheet.absoluteFill},
  canvas: {
    position: 'absolute',
    left: '-20%',
    top: '-20%',
    width: '140%',
    height: '140%',
  },
  credit: {
    position: 'absolute',
    left: 16,
    bottom: 20,
    color: '#e0e4ea',
    fontSize: 11,
  },
});
