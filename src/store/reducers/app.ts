import { createSlice, PayloadAction } from 'redux-starter-kit';

interface LanguageState {
  language: {
    isRTL: boolean;
    name: string;
  };
}
interface IsFirstLaunchState {
  isFirsLaunch: boolean;
}
type AppState = LanguageState & IsFirstLaunchState;

const initialState: AppState = {
  language: { isRTL: true, name: 'fa' },
  isFirsLaunch: true,
};

const appSlice = createSlice({
  slice: 'app',
  initialState: initialState,
  reducers: {
    changeLanguage(state, action: PayloadAction<AppState['language']>) {
      const { isRTL, name } = action.payload;
      state.language.name = name;
      state.language.isRTL = isRTL;
    },
    resetAppFirstLaunch(state) {
      state.isFirsLaunch = true;
    },
    setAppFirstLaunch(state) {
      state.isFirsLaunch = false;
    },
  },
});

export const {
  changeLanguage,
  setAppFirstLaunch,
  resetAppFirstLaunch,
} = appSlice.actions;

export default appSlice.reducer;
