import { Injectable, NgModule} from '@angular/core';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable()
@NgModule()
export class genericService{
  private db = null;

  constructor(
      public afs: AngularFirestore
  )
  {
      this.db = afs.firestore;
  }

  async insert(collectionName: string, object: any) {
    let result = await this.db.collection(collectionName).add(object).then((doc) => {
        return doc.id;
    }).catch((error) => {
        console.log(error);
    });

    return result
}

async update(collectionName: string, id: string, object: any) {
    let result = await this.db.collection(collectionName).doc(id).update(object).then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return null;
        }
    }).catch((error) => {
        console.log(error);
    });

    return result
}

async get(collectionName: string, id: string) {
    let result = await this.db.collection(collectionName).doc(id).get().then((doc) => {
        if (doc.exists) {
            return doc.data();
        } else {
            return null;
        }
    }).catch((error) => {
        console.log(error);
    });

    return result;
}

}
