export interface DashboardType {
   data: {
      activity: {
         message: string;
         fromTimestamp: number;
         user: {
            name: string;
         };
      }[];
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
         process: number;
         finish: number;
         canceled: number;
      };
   };
}

export interface StatusType {
   status: number;
   name: string;
}

export interface Status {
   data: {
      status: {
         total: number;
         process: number;
         finish: number;
         canceled: number;
      };
   };
}

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
      timeline: {
         status: string;
         note: string;
         timestamp: number;
         user: {
            name: string;
         };
      }[];
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
         };
         [];
      }[];
   };
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
   timeline: {
      status: string;
      note: string;
      timestamp: number;
      user: {
         name: string;
      };
   }[];
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
      };
      [];
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
