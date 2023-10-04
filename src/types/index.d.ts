import { Delevery } from '@/lib/types';

export interface DashboardType {
   activity: ActivityT[];
   total: {
      month: string;
      total: number;
      canceled: number;
   }[];
   rank: {
      name: string;
      variant: string;
      total: number;
   }[];
   status: {
      total: number;
      inprogress: number;
      finish: number;
      canceled: number;
   };
}

export interface ActivityT {
   message: string;
   fromTimestamp: number;
   user: {
      name: string;
   };
}

export interface StatusType {
   status: number;
   name: string;
   color?: string;
   icon?: React.ReactNode;
}

export interface Status {
   status: {
      total: number;
      inprogress: number;
      finish: number;
      canceled: number;
   };
}

export interface ItemType {
   id: number;
   no: string;
   type: string;
   name: string;
   variant: string;
   qty: number;
   variantId: number;
   itemId: number;
   status: string;
   itemProgress: {
      status: string;
      note: string;
      timestamp: number;
      user: {
         name: string;
      };
   }[];
}

//

export interface DetailPoType {
   data: {
      no: string;
      store: string;
      sales: string;
      dateNote: string;
      dateDelivery: string;
      specialNote: false;
      senderName: string;
      senderAddress: string;
      recipientName: string;
      recipientAddress: string;
      note: string;
      attachment: string;
      status: string;
      timeline: TimelineT[];
      items: ItemType[];
   };
}

export interface TimelineT {
   id: number;
   status: string;
   note: string;
   no: string;
   updatedBy: string;
   timestamp: number;
}

export interface DetailPoTableType {
   no: string;
   store: string;
   sales: string;
   dateNote: string;
   dateDelivery: string;
   specialNote: false;
   senderName: string;
   senderAddress: string;
   recipientName: string;
   recipientAddress: string;
   note: string;
   attachment: string;
   status: string;
   timeline: TimelineT[];
   items: {
      id: number;
      no: string;
      type: string;
      name: string;
      variant: string;
      qty: number;
      variantId: number;
      itemId: number;
      status: string;
      itemProgress: {
         status: string;
         note: string;
         timestamp: number;
         user: {
            name: string;
         };
      }[];
   }[];
}

export interface LevelType {
   data: {
      id: number;
      name: string;
      code: number;
   }[];
}

export interface LevelTabelType {
   id: number;
   name: string;
   code: number;
}

export interface UserDataType {
   data: {
      id: string;
      name: string;
      username: string;
      isActive: boolean;
      autoUpdate: boolean;
      image: string | null;
      levelUser: {
         id: number;
         name: string;
         code: number;
      };
   }[];
}

export interface FeatureType {
   data: {
      feature: string;
      method: string[];
   }[];
}

export interface RankType {
   rank: {
      name: string;
      variant: string;
      total: number;
   }[];
}

export interface AllPurchaseOrder {
   data: {
      count: number;
      totalPages: number;
      currentPage: number;
      notes: Delevery[];
   };
}

export interface AllItemType {
   data: {
      count: number;
      totalPages: number;
      currentPage: number;
      items: {
         no: string;
         store: string;
         sales: string;
         dateNote: string;
         dateDelivery: string;
         specialNote: false;
         senderName: string;
         senderAddress: string;
         recipientName: string;
         recipientAddress: string;
         note: string;
         attachment: string;
         status: string;
         timeline: {
            status: string;
            note: string;
            timestamp: number;
            user: {
               name: string;
            };
         }[];
         items: ItemType[];
      }[];
   };
}

export interface UserDetailT {
   data: UserDetail;
}

export interface UserDetail {
   id: string;
   name: string;
   username: string;
   isActive: boolean;
   autoUpdate: boolean;
   image: string | null;
   updatedBy: string;
   levelUser: {
      id: number;
      name: string;
      code: number;
   };
   access: string[];
   module: {
      userId: string;
      method: string;
      feature: string;
   }[];
}

export interface UserMeType {
   data: {
      image: string | null;
      username: string;
      name: string;
      level: string;
      access: string[];
      module: {
         userId: string;
         method: string;
         feature: string;
      }[];
   };
}

export interface fetchingServerType<ResponseType> {
   data: ResponseType;
}

export interface StatusItem {
   data: StatusT[];
}
export interface StatusT {
   id: number;
   name: string;
}

export interface ItemPO {
   data: {
      count: number;
      totalPages: number;
      currentPage: number;
      items: Item[];
   };
}

export interface Item {
   id: number;
   no: string;
   type: string;
   name: string;
   variant: string;
   qty: number;
   variantId: number;
   itemId: number;
   statusId?: number | null;
   inv: {
      store: string;
      dateDelivery: string;
      dateNote: string;
      recipientName: string;
   };
   status?: { name: string } | null;
   itemProgress: ItemProgressT[];
}

export interface ItemProgressT {
   status: {
      name: string;
   };
   note: string;
   timestamp: number;
   user: {
      name: string;
   };
}

export interface ProgressSummaryT {
   data: {
      statusId: number;
      name: string;
      items: Item[];
   }[];
}

export interface TollPaymentT {
   gate: string;
   amount: string;
   time: string;
}

export interface ShipmentT {
   id: string;
   driverId: number;
   driverName: string;
   driverPlate: string;
   parking: number;
   porter: number;
   whGate: number;
   toll: number;
   gas: number;
   tollBalance: number;
   amountRequest: number;
   topupToll: number;
   shipmentDate: string;
   updatedBy: string;
   UserUpdate: {
      name: string;
   };
}

export interface DataShipment {
   data: ShipmentT[];
}

export interface DriverDataT {
   data: DriverT[];
}

export interface DriverT {
   id: number;
   userId: string;
   platNo: string;
   User: {
      name: string;
   };
   UserUpdate: {
      name: string;
   };
}

export interface DetailShipmentT {
   data: {
      id: string;
      driverId: number;
      driverName: string;
      driverPlate: string;
      parking: number;
      porter: number;
      whGate: number;
      toll: number;
      gas: number;
      tollBalance: number;
      amountRequest: number;
      topupToll: number;
      shipmentDate: string;
      updatedBy: string;
      tollMeta: TollMetaT[];
      parkingMeta: ParkingMetaT;
      porterMeta: PorterMetaT;
      whGateMeta: WhGateMetaT;
   };
}

export interface TollMetaT {
   id: number;
   shipmentId: string;
   gate: string;
   amount: number;
   time: string;
}

export interface ParkingMetaT {
   avail: AvailT[];
   amount: AmountT[];
}

export interface PorterMetaT {
   avail: AvailT[];
   amount: AmountT[];
}

export interface WhGateMetaT {
   avail: AvailT[];
   amount: AmountT[];
}

export interface AmountT {
   id: number;
   shipmentId: string;
   amount: number;
   type: string;
   Items: ItemShipmentT[];
}

export interface ItemShipmentT {
   Item: {
      name: string;
   };
   itemId: number;
}

export interface AvailT {
   id: number;
   no: string;
   type: string;
   name: string;
   variant: string;
   qty: number;
   variantId: number;
   itemId: number;
   statusId: number;
}
