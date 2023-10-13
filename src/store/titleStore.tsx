import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ShipmentState {
   title: string;
   setTitle: (date: string) => void;
}

export const shipmentStore = create<ShipmentState>()(
   persist(
      (set, get) => ({
         title: '',
         setTitle: (title) => set(() => ({ title: title })),
      }),
      {
         name: 'dateShipment',
      }
   )
);
