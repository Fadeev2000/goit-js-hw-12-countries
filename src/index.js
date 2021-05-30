import './sass/main.scss';

let l = console.log;

import itemsMultipleTemplate from './templates/multiple-search-result.hbs';
import itemsSingleTemplate from './templates/single-search-result.hbs';

import { alert, Stack} from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/material.css';
import 'material-design-icons/iconfont/material-icons.css';

import debounce from 'lodash.debounce';

import FetchCountries from './js/fetchCountries';
import { consts } from './js/consts';

const fetchCountries = new FetchCountries()

const debouncedOnInput = debounce(onInput, consts.DELAY);

function messageChangeInput(message) {
    /*const myStack = new Stack({
        dir1: 'up',
    });*/
    alert({
        text: message,
        //stack: myStack,
        styling: 'material',
        icons: 'material',
    });
}

consts.refs.inputValue.addEventListener('input', debouncedOnInput)

function onInput() {
    console.clear();
    fetchCountries.getFetch(consts.refs.inputValue.value)
        .then((arrCountries) => {
            if (fetchCountries.statusOk) {
                if (arrCountries.length > consts.NUMBER_OF_COUNTRIES) {
                    consts.refs.listCountries.innerHTML = '';
                    messageChangeInput('Too many matches found. Pleas enter a more specific query!');
                    return;
                }
                
                const markup = arrCountries.length === 1 ?
                    itemsSingleTemplate(arrCountries) :
                    itemsMultipleTemplate(arrCountries);
        
                consts.refs.listCountries.innerHTML = '';
                consts.refs.listCountries.insertAdjacentHTML('beforeend', markup);
                return;
            }

            throw new Error(fetchCountries.statusOk);
        })
        .catch(error => {
            console.log('response', error);
            consts.refs.listCountries.innerHTML = '';
            if (consts.refs.inputValue.value !== '') {
                messageChangeInput('No matches found. Try again.');
            }
        });
};
