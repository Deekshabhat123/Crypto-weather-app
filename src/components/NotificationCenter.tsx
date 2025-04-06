"use client";
 
import React, { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { removeNotification, markAsDisplayed } from '@/features/notifications/notificationSlice';
 
const NotificationCenter: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notifications.list);
  const dispatch = useDispatch();
 
  const handleDismiss = (id: number) => {
    toast.dismiss(id.toString());
    dispatch(removeNotification(id));
  };
 
  useEffect(() => {
    notifications.forEach((notification) => {
      if (!notification.displayed) {
        toast(
          <div className="flex flex-col">
            <span className="font-semibold">
              {notification.type === 'price_alert' ? 'Price Alert' : 'Weather Alert'}
            </span>
            <span>{notification.message}</span>
            <button
              className="mt-2 text-sm text-red-500 hover:underline"
              onClick={() => handleDismiss(notification.id)}
            >
              Dismiss
            </button>
          </div>,
          {
            id: notification.id.toString(),
            duration: 5000,
            position: 'top-right',
          }
        );
 
        setTimeout(() => {
          dispatch(removeNotification(notification.id));
        }, 5000);
 
        dispatch(markAsDisplayed(notification.id));
      }
    });
  }, [notifications, dispatch]);
 
  return (
    <>
   
      <Toaster />
    </>
  );
};
 
export default NotificationCenter;
 
 