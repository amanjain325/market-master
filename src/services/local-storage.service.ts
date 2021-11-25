import { Injectable } from '@angular/core';

@Injectable()

export class LocalStorageService {

    constructor() { }

    // get item from local storage
    get(key: string): string {
        return JSON.parse(localStorage.getItem(key));
    }

    // set item in local storage
    set(key: string, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // delete a paritcular item from local storage
    delete(key: string): void {
        localStorage.removeItem(key);
    }

    // delete all items from local storage
    clear(): void {
        localStorage.clear();
    }

}