
//const fetch = require("node-fetch");



window.onload = function estadistica(){
    var ctx = document.getElementById('miGrafico').getContext('2d');
    var recycling = document.getElementById('miReciclaje').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: '',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
            }]
        },
        options: {
            responsive: true,
        }
    });
    let url = 'https://jsonplaceholder.typicode.com/todos';
        fetch(url)
            .then(response => response.json())
            .then( datos => mostrar(datos))
            .catch( error => console.log(error))

        const mostrar = (articulos) =>{
            articulos.forEach(element => {
                console.log(element);
                myChart.data['labels'].push(element.userId)
                myChart.data['datasets'][0].data.push(element.id)
            });
        }








var myChart = new Chart(recycling, {
    type: 'bar',
    data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', "Noviembre", 'Diciembre'],
        datasets: [{
            label: 'Reciclaje',
            data: [1200, 1900, 3000, 5400, 1220, 3600, 4800, 4578, 2566, 8545, 4587, 9000],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ]
        }]
    },
    options: {
        responsive: true,
    }
});
}