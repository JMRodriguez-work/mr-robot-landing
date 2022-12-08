const API =
  "https://youtube-v31.p.rapidapi.com/search?channelId=UCv-HoLYg3j53JgVC30P0mRg&part=snippet%2Cid&order=date&maxResults=9";

const content = null || document.getElementById('content');

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "89ec44c523msh584b5164d3a074bp1e02cfjsn6bed1d9e7626",
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

async function fetchData(urlApi) {
  const response = await fetch(urlApi, options);
  const data = await response.json();
  return data;
}

//Dentro implementamos la lógica necesaria para hacer el llamado a la API, obtener los elementos y mostrarlos en html
//Se implementa try y catch
(async () => {
  try {
    const videos = await fetchData(API);
    let view = `
    ${videos.items.map(video => `
            <div class="group relative">
                <a href="https://www.youtube.com/watch?v=${video.id.videoId}" target="_blank">
                <div
                    class="w-full bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:aspect-none">
                    <img src="${video.snippet.thumbnails.high.url}" alt="${video.snippet.description}" class="w-full">
                </div>
                <div class="mt-4 flex justify-between">
                    <h3 class="text-sm text-gray-700">
                    <span aria-hidden="true" class="absolute inset-0"></span>
                    ${video.snippet.title}
                    </h3>
                </div></a>
            </div>
    `).slice(0, 8).join('')}
            
        `;

        content.innerHTML = view; 
        //innerHTML es igual a la vista que se ha creado e itera con el metodo map y devuelve un nuevo arreglo con los elementos que queremos obtener como el título, la descripción, la imagen miniatura de la API
  } catch (error) {
    console.log(error);
  }
})();
