/*
 * @Author Binief TA.
 * @Date 15/05/2017
 */

export interface ILoginModel {
    component_name: string;
    component_code: string;
}

export class LoginModel implements ILoginModel {

    username: string;
    password: string;

    constructor() {
        this.username = '';
    }


}

