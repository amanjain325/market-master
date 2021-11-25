import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { catchError, map, switchMap, first } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';
import firebase from 'firebase/app';

@Injectable()

export class FireStoreService {
    constructor(
        private _afStore: AngularFirestore) {
    }

    get(path: string, docId?: string, ref?: any): Observable<any> {
        // console.log(path);
        if (docId) {
            return this._afStore.collection(path, ref).doc(docId).valueChanges().pipe(
                map(data => {
                    return data;
                }),
                catchError(this.catchFirestoreError.bind(this, path))
            );
        } else {
            return this._afStore.collection(path, ref).snapshotChanges().pipe(
                map(data => {
                    const resp = data.map(a => {
                        const data: any = a.payload.doc.data();
                        data.docId = a.payload.doc.id;
                        return data;
                    })
                    return resp;
                }),
                catchError(this.catchFirestoreError.bind(this, path))
            );
        }
    }

    create(path: string, payload: any, docId?: string) {
        // console.log(path);
        if (docId) {
            return this._afStore.collection(path).doc(docId).set(payload);
        } else {
            return this._afStore.collection(path).doc().set(payload);
        }
    }

    update(path: string, payload: any, docId: string) {
        // console.log(path);
        return this._afStore.doc(path + '/' + docId).update(payload);
    }

    delete(path: string, docId: string) {
        // console.log(path);
        this._afStore.doc(path + '/' + docId).delete();
    }

    catchFirestoreError(err: any, path: string) {
        // console.log(err, 'err in firebase service having path: ' + path);
        return throwError({ "errorMsg": "Sorry! Something went wrong" });
    }

}