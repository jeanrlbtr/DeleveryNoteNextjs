export type Delevery = {
   no: string;
   store: string;
   sales: string;
   dateNote: string;
   dateDelivery: string;
   specialNote: boolean;
   senderName: string;
   senderAddress: string;
   recipientName: string;
   recipientAddress: string;
   note: string;
   attachment: string;
   status: string;
   timestamp: number;
   items: {
      name: string;
      variant: string;
      type: string;
      qty: number;
      status: string;
   }[];
};

export type NoteDetail = {
   store: string;
   sales: string;
   no: string;
   senderName: string;
   recipientAddress: string;
   reasonChanged: string;
   recipientName: string;
   attachment: string;
   note: string;
   dateDelivery: string;
   dateNote: string;
};

export type History = {
   store: string;
   sales: string;
   no: string;
   recipientAddress: string;
   reasonChanged: string;
   addDate: string;
};

export type Allhistory = {
   store: string;
   sales: string;
   no: string;
   senderName: string;
   recipientAddress: string;
   reasonChanged: string;
   addDate: string;
   recipientName: string;
   attachment: string;
   note: string;
   dateDelivery: string;
   dateNote: string;
};

export type HistoryItem = {
   id: string;
   historyId: string;
   type: string;
   name: string;
   variant: string;
   qty: number;
   variantId: number;
   itemId: 221;
};
export type Items = {
   reasonChanged: string;
   addDate: string;
};

export type Users = {
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
};

export type Loading = {
   loading: string;
};

export type Invoice = {
   name: string;
   qty: number;
};

export type Level = {
   code: number;
   name: string;
};

export type RankItem = {
   name: string;
   variant: string;
   total: number;
};
