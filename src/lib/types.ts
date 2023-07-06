export type Delevery = {
  no: number;
  store: string;
  sales: string;
  address: string;
  nomor_sj: string;
  dateDelevery: string;
  status: boolean;
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
  name: string;
  username: string;
  isActive: boolean;
  levelId: string;
  image: string;
  autoUpdate: string;
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
