import React, {useRef} from 'react';
import {Animated, PanResponder, View, Text} from 'react-native';
import Svg, {Path, G, Text as SvgText, Circle, Rect} from 'react-native-svg';
import styles from './mapStyles';
const streets = Array.from({length: 28}, (_, i) => {
  const y = i * 29;
  return `M ${60 + (i % 5) * 15} ${y} L ${205 + (i % 4) * 13} ${y + 32} L 380 ${
    y - 30
  }`;
});
export default function RouteMap({route = false}: {route?: boolean}) {
  const pan = useRef(new Animated.ValueXY()).current;
  const position = useRef({x: 0, y: 0});
  const responder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) + Math.abs(g.dy) > 7,
      onPanResponderGrant: () => pan.setOffset(position.current),
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, g) => {
        position.current = {
          x: position.current.x + g.dx,
          y: position.current.y + g.dy,
        };
        pan.flattenOffset();
      },
    }),
  ).current;
  return (
    <View style={styles.container} {...responder.panHandlers}>
      <Animated.View
        style={[
          route ? styles.routeCanvas : styles.canvas,
          {transform: pan.getTranslateTransform()},
        ]}
      >
        <Svg
          width="100%"
          height="100%"
          viewBox={route ? '0 0 400 560' : '0 0 400 800'}
          preserveAspectRatio={route ? 'none' : 'xMidYMid slice'}
        >
          <Rect width="400" height="800" fill="#505966" />
          <Path
            d="M85 0L170 0 165 70 135 140 147 198 125 250 146 297 128 340 152 390 141 420 165 455 158 520 179 555 169 625 199 680 190 800H400V0Z"
            fill="#353f49"
          />
          <Path
            d="M335 0L285 120 305 205 270 302 294 353 259 432 283 515 248 650 270 800H400V0Z"
            fill="#46515d"
          />
          <G fill="none" stroke="#29333d" strokeWidth="1.3">
            {streets.map((d, i) => (
              <Path key={i} d={d} />
            ))}
            {[150, 180, 210, 240, 270, 300, 330].map(x => (
              <Path key={x} d={`M${x} 0 Q${x - 100} 300 ${x + 10} 800`} />
            ))}
          </G>
          <Path
            d="M280 0 Q185 150 233 260 T205 450 T198 800 M115 540L340 370"
            stroke="#232e38"
            strokeWidth="5"
            fill="none"
          />
          {['ANDHERI', 'POWAI', 'BANDRA WEST', 'CHEMBUR', 'SION', 'DADAR'].map(
            (label, i) => (
              <SvgText
                key={label}
                x={[165, 295, 133, 285, 207, 194][i]}
                y={[150, 220, 330, 350, 400, 464][i]}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fill="#b4c9e9"
                letterSpacing="1"
              >
                {label}
              </SvgText>
            ),
          )}
          {route && (
            <G>
              <Path
                d="M220 210 C190 230 209 246 205 275 L207 325 Q207 340 193 345 L189 357 Q208 384 203 410 L196 453"
                stroke="#fbfbfa"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />
              <Circle cx="220" cy="210" r="8" fill="#fff" />
              <Circle cx="220" cy="210" r="3" fill="#111" />
              <Rect x="188" y="447" width="15" height="15" fill="#fff" />
              <Rect x="193" y="452" width="5" height="5" fill="#111" />
              <Rect
                x="233"
                y="216"
                width="53"
                height="28"
                rx="8"
                fill="#1d1d1c"
              />
              <SvgText
                x="259"
                y="235"
                fill="#fff"
                fontSize="14"
                textAnchor="middle"
              >
                2 min
              </SvgText>
            </G>
          )}
        </Svg>
      </Animated.View>
      <Text style={styles.credit}>Demo map</Text>
    </View>
  );
}
