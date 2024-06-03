import React, { useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { RNButton, RNSlider } from '../../../Common';
import { View } from 'react-native';
import { wp } from '../../../Theme';

const Rotate = ({ onChange, progress }) => {
  const [State, setState] = useState({ show: false });
  const min = useSharedValue(0);
  const max = useSharedValue(360);

  const toggleShow = () => setState(p => ({ ...p, show: !p.show }));

  return (
    <View style={{ paddingHorizontal: wp(4) }}>
      <RNButton title={'Rotate'} onPress={toggleShow} />

      {State.show && (
        <RNSlider
          progress={progress}
          minimumValue={min}
          maximumValue={max}
          step={8}
          onSlidingComplete={v => onChange(v)}
        />
      )}
    </View>
  );
};

export default Rotate;
