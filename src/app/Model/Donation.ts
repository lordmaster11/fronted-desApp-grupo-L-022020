import { Project } from './Project';
import { User } from './User';

export class Donation{
    id:number;
    dateDonation:Date;
    amount:number;
    comment:string;
    project:Project;
    user: User;
}