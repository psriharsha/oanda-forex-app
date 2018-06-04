
export class OrderRequest{
    units : number;
    instrument : String;
    timeInForce : String;
    type : String;
    positionFill : String;

    constructor(){
        this.units = 0;
        this.instrument = "EUR_USD";
        this.timeInForce = "FOK";
        this.type = "MARKET";
        this.positionFill = "DEFAULT";
    }
}