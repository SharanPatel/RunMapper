import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Feed from "../screens/feed";
import StartRun from "../screens/startRun";

const screens = {
  Feed: {
    screen: Feed,
  },
  StartRun: {
    screen: StartRun,
  },
};

const HomeStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerShown: false,
    animationEnabled: false,
  },
});

export default createAppContainer(HomeStack);
