document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const select = document.getElementById('cars'),
        output = document.getElementById('output');
    const promis = () => new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        request.open('GET', './cars.json');
        request.setRequestHeader('Content-type', 'application/json');
        request.send();
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) {
                return;
            }
            if (request.status === 200) {
                const data = JSON.parse(request.responseText);
                data.cars.forEach(item => {
                    if (item.brand === select.value) {
                        const {brand, model, price} = item;
                        const result = `Тачка ${brand} ${model} <br>
                        Цена: ${price}$`;
                        resolve(result);
                    } else {
                        output.innerHTML = 'Тачка не найдена';
                    }
                });
            } else {
                const errorText = 'Произошла ошибка';
                reject(errorText);
            }
        });
    });
        select.addEventListener('change', () => {
            promis()
                .then(result => {
                    output.innerHTML = result;
                })
                .catch(error => {
                    output.innerHTML = error;
                });
        });
    
    
});