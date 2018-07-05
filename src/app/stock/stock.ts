import { Price } from '../price';

export class Stock {
    name : string;
    currency: string;
    bid: number;
    ask: number;
    type: string;
    direction: number;
    isSelected: boolean;
    isHidden: boolean;

    setBid(newBid : number){
        if (undefined === this.bid || newBid === this.bid)
            this.direction = 0;
        else if (newBid < this.bid)
            this.direction = -1;
        else
            this.direction = 1;
        this.bid = newBid;
    }

    setAsk(newAsk : number){
        this.ask = newAsk;
    }
}