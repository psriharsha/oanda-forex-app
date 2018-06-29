
export class Trade{
    instrument              : string;
    price                   : number;
    openTime                : Date;
    initialUnits            : number;
    initialMarginRequired   : number;
    state                   : string;
    currentUnits            : number;
    realizedPL              : number;
    financing               : number;
    unrealizedPL            : number;
    marginUsed              : number;
}