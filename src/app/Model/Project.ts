import { Location } from '../Model/Location';

export class Project{
    id:number;
    locationProject:Location;
    factor:number;
    percentageRequiredForClosing:number;
    fantasyName:string;
    donatedAmount:number;
    isOpen:boolean;
    moneyNeeded:number;
    numberOfDonors:number;
}