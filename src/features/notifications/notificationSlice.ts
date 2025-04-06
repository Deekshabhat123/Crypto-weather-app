import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationType {
  id: number;
  type: 'price_alert' | 'weather_alert';
  message: string;
  displayed: boolean;
  timestamp: number;
}

interface NotificationState {
  list: NotificationType[];
}

const initialState: NotificationState = {
  list: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Omit<NotificationType, 'displayed'>>) => {
      state.list.push({ ...action.payload, displayed: false });
    },
    markAsDisplayed: (state, action: PayloadAction<number>) => {
      const notification = state.list.find((n) => n.id === action.payload);
      if (notification) {
        notification.displayed = true;
      }
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((n) => n.id !== action.payload);
    },
  },
});

export const { addNotification, markAsDisplayed, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
