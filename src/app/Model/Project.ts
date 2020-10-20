import { Location } from '../Model/Location';

export class Project{
    id:number;
    location:Location;
    factor:String;
    percentageRequiredForClosing:String;
    fantasyName:String;
    donatedAmount:number;
    isOpen:boolean;
}