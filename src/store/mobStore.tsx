import { makeAutoObservable } from 'mobx';

// Model the application state.
class MobStore {
  photos = [];
  photo = {};

  constructor() {
    makeAutoObservable(this);
  }

  setPhotos(data: any) {
    this.photos = data;
  }
  get getPhotos() {
    return this.photos;
  }

  //   setPhoto(data) {
  //     this.photo = data;
  //   }
  //   get getPhoto() {
  //     return this.photo;
  //   }
}

export const mobStore = new MobStore();
