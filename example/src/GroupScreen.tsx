import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ScreenList = () => {
  const navigation = useNavigation();

  const onPress = (route: string) => {
    navigation.navigate(route as never);
  };
  return (
    <>
      {SCREENS.map((sc, index) => (
        <View key={`${sc.label}-${index}`} style={styles.exampleListItemBorder}>
          <TouchableOpacity onPress={() => onPress(sc.label)}>
            <View style={styles.exampleListItem}>
              <Text style={styles.exampleListLabel}>{sc.label}</Text>
            </View>
          </TouchableOpacity>
        </View>
      ))}
    </>
  );
};

export default ScreenList;

const styles = StyleSheet.create({
  exampleList: {
    flex: 1,
  },
  exampleListItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  exampleListItemBorder: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  exampleListLabel: {
    fontSize: 18,
  },
});

const SCREENS = [
  {
    label: 'MapSettings',
    route: 'MapSettings',
  },
  {
    label: 'MapEventsListener',
    route: 'MapEventsListener',
  },
  {
    label: 'MapCamera',
    route: 'MapCamera',
  },
  {
    label: 'MapLineLayer',
    route: 'MapLineLayer',
  },
  {
    label: 'MapCircleLayer',
    route: 'MapCircleLayer',
  },
];
