import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Lockin {
  id: string;
  name: string;
  frequency: "daily" | "weekly";
  completedDates: string[];
  createdAt: string;
}

interface LockinState {
  lockins: Lockin[];
  isLoading: boolean;
  error: string | null;
}

const initialState: LockinState = {
  lockins: [],
  isLoading: false,
  error: null,
};

export const fetchLockins = createAsyncThunk("lockins/fetchLocikins", async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockLockins: Lockin[] = [
    {
      id: "1",
      name: "watch xyz",
      frequency: "daily",
      completedDates: [],
      createdAt: new Date().toISOString(),
    }
  ];
  return mockLockins;
});

const lockinSlice = createSlice({
  name: "lockins",
  initialState,
  reducers: {
    addLockin: (
      state,
      action: PayloadAction<{ name: string; frequency: "daily" | "weekly" }>
    ) => {
      const newLockin: Lockin = {
        id: Date.now().toString(),
        name: action.payload.name,
        frequency: action.payload.frequency,
        completedDates: [],
        createdAt: new Date().toISOString(),
      };

      state.lockins.push(newLockin);
    },
    toggleLockin: (
      state,
      action: PayloadAction<{ id: string; date: string }>
    ) => {
      const lockin = state.lockins.find((l) => l.id === action.payload.id);

      if (lockin) {
        const index = lockin.completedDates.indexOf(action.payload.date);
        if (index > -1) {
          lockin.completedDates.splice(index, 1);
        } else {
          lockin.completedDates.push(action.payload.date);
        }
      }
    },
    removeLockin: (state, action: PayloadAction<string>) => {
      state.lockins = state.lockins.filter(
        (lockin) => lockin.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLockins.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLockins.fulfilled, (state, action) => {
        state.isLoading = false;
        state.lockins = action.payload;
      })
      .addCase(fetchLockins.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Failed to fetch lockins";
      });
  },
});

export const { addLockin, toggleLockin, removeLockin } = lockinSlice.actions;
export default lockinSlice.reducer;
