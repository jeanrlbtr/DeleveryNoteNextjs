export interface ItemPoType {
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
      specialNote: boolean;
      senderName: string;
      senderAddress: string;
      recipientName: string;
      recipientAddress: string;
      note: string;
      attachment: string;
      status: string;
      createdAt: number;
      updatedAt: any;
      items: string[];
    };
  };
}
