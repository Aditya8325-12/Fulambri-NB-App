export type RootStackParamList = {
  Home: undefined;
  Jobs: {
    keyword?: string;
  };
  EditProfile: {
    EDIT: boolean;
    ADD: boolean;
    title: string;
  };
};

export type DrawerParamList = {
  MainTabs: undefined;
  Settings: undefined;
  EditProfile: {
    EDIT?: boolean;
    ADD?: boolean;
    title?: string;
  };
};
