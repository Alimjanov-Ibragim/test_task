import axios from 'axios';

// import { toJS } from 'mobx'
import { mobStore } from '../../store/mobStore';

export const url = 'https://jsonplaceholder.typicode.com';

export const instance = axios.create({
  baseURL: url
});

export const fetchPhotos = {
  getAll(params: any) {
    return instance
      .get('/photos', { params })
      .then(response => {
        mobStore.setPhotos(response.data);
      })
      .catch(() => {
        instance.get('/photos', { params }).then(response => {
          mobStore.setPhotos(response.data);
        });
      });
  },
  deletePhoto(id: number) {
    return instance.delete(`/photos/${id}`).catch(error => {
      console.log('Error: ', error);
    });
  }
};
