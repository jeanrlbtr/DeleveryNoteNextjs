import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShipmentState {
   date: Date;
   setDate: (date: Date) => void;
}

export const shipmentStore = create<ShipmentState>()(
   persist(
      (set, get) => ({
         date: new Date(),
         setDate: (date) => set(() => ({ date: date })),
      }),
      {
         name: 'dateShipment',
      }
   )
);
