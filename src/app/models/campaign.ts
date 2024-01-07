import {Tag} from "./tag";
import {Seller} from "./seller";
import {Town} from "./town";

export class Campaign {
  id?: number;
  name: string;
  tags: Tag[];
  bidAmount: number;
  status: string;
  town: Town;
  radius: number;
  seller: Seller;
}
