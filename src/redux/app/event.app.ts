import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { useAppSelector } from "..";
import { IEventsProps } from "../../interface/event.inteface";

export interface EventSliceProps {
     events: IEventsProps[];
}

const initialState: EventSliceProps = {
     events: [],
};

const EventSlice = createSlice({
     initialState,
     name: "event",
     reducers: {
          setEvent: (state, action: PayloadAction<IEventsProps>) => {
               state.events.push(action.payload);
          },
     },
});

export const useEventSlice = () =>
     useAppSelector((state) => {
          return state.event;
     });
export const EventReducer = EventSlice.reducer;
export const { setEvent } = EventSlice.actions;
