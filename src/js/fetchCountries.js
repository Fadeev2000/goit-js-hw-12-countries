import { consts } from './consts';

export default class FetchCountries {
    constructor() {
        this.statusOk = '';
     }

    getFetch(searchQuery) {
        return fetch(`${consts.BASE_URL}/name/${searchQuery}?fields=name;capital;population;languages;flag`)
           .then(response => {
                this.statusOk = response.ok;
                if (response.ok) {
                    return response.json();
                }

                throw new Error(response.status);
            })
            .then((data) => {
                return data;
            })
            .catch(error => {
                console.log('error', error);
                return error;
            });
    }
};

