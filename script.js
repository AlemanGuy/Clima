function consultarClima() {
    const ciudad = document.getElementById('ciudad').value;
    const API_KEY = '2b070cca61415611b4adf1564e7b163c'; 
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;

    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error en la respuesta de la API');
      }
    })
    .then(data => {
      // Mostrar resultado en la tabla
      const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
      const fila = tabla.insertRow();
      fila.insertCell().innerHTML = data.name;
      fila.insertCell().innerHTML = `${(data.main.temp - 273.15).toFixed(1)}°C`;
      fila.insertCell().innerHTML = data.weather[0].description;
    })
    .catch(error => {
      console.error('Error al consultar el clima', error);
    });
}

function consultarClimas() {
    const ciudades = document.getElementById('ciudades').value.split(',').map(ciudad => ciudad.trim());

    const API_KEY = '2b070cca61415611b4adf1564e7b163c';

    Promise.all(ciudades.map(ciudad => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${API_KEY}`;
        return fetch(url).then(response => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error('Error en la respuesta de la API');
          }
        });
      }))
      .then(data => {
        // Mostrar resultados en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody')[0];
        data.forEach(ciudad => {
          const fila = tabla.insertRow();
          fila.insertCell().innerHTML = ciudad.name;
          fila.insertCell().innerHTML = `${(ciudad.main.temp - 273.15).toFixed(1)}°C`;
          fila.insertCell().innerHTML = ciudad.weather[0].description;
        });
      })
      .catch(error => {
        console.error('Error al consultar el clima', error);
      });
    }

    function limpiarTabla() {
        // Mostrar resultado en la tabla
        const tabla = document.getElementById('tabla-clima').getElementsByTagName('tbody');
        for(let i = 0; i<tabla.length; i++)
        {
            tabla[i].innerHTML = "";
        }
  }
