import React, { useState } from 'react';
import { View } from 'react-native';
import { RNButton, RNSlider } from '../../../Common';
import { useSharedValue } from 'react-native-reanimated';
import { wp } from '../../../Theme';

const Scale = ({ progress, onChange }) => {
  const [State, setState] = useState({ show: false });
  const min = useSharedValue(0.5);
  const max = useSharedValue(3);

  const toggleShow = () => setState(p => ({ ...p, show: !p.show }));

  return (
    <View style={{ paddingHorizontal: wp(4) }}>
      <RNButton title={'Scale'} onPress={toggleShow} />

      {State.show && (
        <RNSlider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          step={5}
          onSlidingComplete={v => onChange(v)}
        />
      )}
    </View>
  );
};

export default Scale;
