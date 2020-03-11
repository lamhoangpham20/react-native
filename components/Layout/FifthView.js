import React from 'react'
import { View, Text } from 'react-native'
import RNPickerSelect from 'react-native-picker-select';
const FifthView = () => {
  return (
    <View style={{ margin: 50 }}>
      <RNPickerSelect
        onValueChange={(value) => console.log(value)}
        items={[
          { label: 'Football', value: 'football' },
          { label: 'Baseball', value: 'baseball' },
          { label: 'Hockey', value: 'hockey' },
        ]}
      />
    </View>
  )
}

export default FifthView
