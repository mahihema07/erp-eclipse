/*
 * @Author Binief TA.
 * @Date 15/05/2017
 */

export interface ISpecificationComponentModel {
    id: number;
    isactive: boolean;
    createdby: number;
    createdtime: any;
    updatedby: number;
    updatedtime: any;
    user_id: number;
    component_name: string;
    component_code: string;
}

export class SpecificationComponentModel implements ISpecificationComponentModel {

    id: number;
    isactive: boolean;
    createdby: number;
    createdtime: any;
    updatedby: number;
    updatedtime: any;
    user_id: number;
    component_name: string;
    component_code: string;

    constructor() {
        this.component_name = '';
        this.isactive = true;
    }


}

