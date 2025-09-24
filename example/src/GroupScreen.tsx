import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SCREENS } from './routes';

const ScreenList = () => {
  const navigation = useNavigation();

  const onPress = (route: string) => {
    navigation.navigate(route as never);
  };
  return (
    <>
      {SCREENS.map((screen, index) => (
        <View
          key={`${screen.label}-${index}`}
          style={styles.exampleListItemBorder}
        >
          <TouchableOpacity onPress={() => onPress(screen.label)}>
            <View style={styles.exampleListItem}>
              <Text style={styles.exampleListLabel}>{screen.label}</Text>
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
