import { MaterialCommunityIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BottomNavigation } from "react-native-paper";

const allowedTabs = ["index", "categories", "exercises"];

export function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const routes = state.routes
    .filter((route) => allowedTabs.includes(route.name))
    .map((route) => {
      const options = descriptors[route.key].options;
      return {
        key: route.name,
        title: options.title || route.name,
        focusedIcon: options.tabBarIcon,
      };
    });

  return (
    <BottomNavigation.Bar
      navigationState={{ index: state.index, routes }}
      onTabPress={({ route }) => {
        const routeIndex = state.routes.findIndex((r) => r.name === route.key);
        navigation.navigate(state.routes[routeIndex].name);
      }}
      renderIcon={({ route, color }) => (
        <MaterialCommunityIcons
          name={route.focusedIcon}
          color={color}
          size={24}
        />
      )}
      getLabelText={({ route }) => route.title}
    />
  );
}
