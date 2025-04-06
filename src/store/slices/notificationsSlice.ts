import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NotificationType {
  id: number;
  type: 'price_alert' | 'weather_alert';
  message: string;
  timestamp: number; 
  displayed: boolean; // ✅ Ensure this exists
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
    addNotification: (state, action: PayloadAction<NotificationType>) => {
      state.list.push(action.payload);
    },
    removeNotification: (state, action: PayloadAction<number>) => {
      state.list = state.list.filter((notification) => notification.id !== action.payload);
    },
  },
});

export const { addNotification, removeNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
