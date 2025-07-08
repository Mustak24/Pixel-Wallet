import { createNavigationContainerRef, StackActions } from '@react-navigation/native';
import { RootNavigationParamsList } from './RootNavigation';

const navigation = createNavigationContainerRef<RootNavigationParamsList>();
export {navigation as NavigationRef}



const navigator = {
  navigate: function navigate<RouteName extends keyof RootNavigationParamsList>(
    name: RouteName,
    params?: RootNavigationParamsList[RouteName]
  ) {
    if (navigation.isReady()) {
      navigation.navigate(name as any, params);
    }
  }, 

  goBack: function() {
    if (navigation.isReady() && navigation.canGoBack()) {
      navigation.goBack();
    }
  },
  
  reset: function(name: keyof RootNavigationParamsList, params?: any) {
    if (navigation.isReady()) {
      navigation.reset({
        index: 0,
        routes: [{ name, params }],
      });
    }
  },

  replace: function (name: keyof RootNavigationParamsList, params?: any){
    if(navigation.isReady()){
      navigation.current?.dispatch(StackActions.replace(name, params))
    }
  },

  currentRouteName: function() {
    return navigation.isReady() ? navigation.getCurrentRoute()?.name : null;
  },

  getParams: function<RouteName extends keyof RootNavigationParamsList>(name: RouteName): RootNavigationParamsList[RouteName] | undefined {
    if (navigation.isReady()) {
      const route = navigation.getState().routes.find(route => route.name === name);
      return route ? (route.params as RootNavigationParamsList[RouteName]) : undefined;
    }
    return undefined;
  }
} 

export default navigator