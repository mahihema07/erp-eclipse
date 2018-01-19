/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

export interface IRegistrationModel {
    name: string;
    email: string;
    username: string;
    password: string;
    confirmpassword: string;
}

export class RegistrationModel implements IRegistrationModel {

    name: string;
    email: string;
    username: string;
    password: string;
    confirmpassword: string;

    constructor() {
        this.name = '';
    }

}

