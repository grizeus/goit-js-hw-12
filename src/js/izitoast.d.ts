import IziToastSettings from "izitoast";

declare module "izitoast" {
    export interface IziToastSettings {
        iconUrl?: string;
    }
}