export enum TouristsRouteType {
  COUNTRY = "country",
  FOREIGN = "foreign",
}

export interface ITouristsRoute {
  _id: string;
  reservationFee: number;
  name: string;
  description: string;
  type: TouristsRouteType;
  promotionRate: number;
  route: string[];
  images: string[];
  companyId: string;
  createdAt: Date;
  point?: number;
}
