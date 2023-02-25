import { CommunityLogo } from "@/components/CommunityLogo/CommunityLogo";
import { RootState } from "@/store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type DirectoryItemProps = CommunityLogo & {
  url: string | null;
};

export type DirectoryState = {
  isOpenDirectory: boolean;
  selectedDirectoryItem: any | null;
};

const defaultSelectedDirectoryItemItem: DirectoryItemProps = {
  url: null,
  imageUrl: null,
  icon: "Home",
  iconColor: "black",
};

const initialState: DirectoryState = {
  isOpenDirectory: false,
  selectedDirectoryItem: { ...defaultSelectedDirectoryItemItem },
};

const directorySlice = createSlice({
  name: "directory",
  initialState,
  reducers: {
    toggleDirectoryOpen(state) {
      state.isOpenDirectory = !state.isOpenDirectory;
    },
    setDirectoryOpen(state, action: PayloadAction<boolean>) {
      state.isOpenDirectory = action.payload;
    },

    setSelectedDirectoryItem(state, action: PayloadAction<DirectoryItemProps>) {
      state.selectedDirectoryItem = action.payload;
    },
    resetSelectedDirectoryItem(state) {
      state.selectedDirectoryItem = { ...defaultSelectedDirectoryItemItem };
    },
  },
});

export const {
  toggleDirectoryOpen,
  setDirectoryOpen,
  setSelectedDirectoryItem,
  resetSelectedDirectoryItem,
} = directorySlice.actions;

export const selectDirectory = (state: RootState) => state.directorySlice;
export const selectDirectoryIsOpen = (state: RootState) =>
  state.directorySlice.isOpenDirectory;
export const selectSelectedDirectoryItem = (state: RootState) =>
  state.directorySlice.selectedDirectoryItem;

export default directorySlice.reducer;
