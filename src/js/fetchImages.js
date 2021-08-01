const axios = require('axios').default;
const BASEURL = 'https://pixabay.com/api/';
const pixabayKEY = '22582996-2a8e449eb1831e14bd2864520';
const filtersAPI = 'image_type=photo&orientation=horizontal&safesearch=true';

async function fetchImages(searchImage, page) {
    try {
        const response = await axios.get(`${BASEURL}?key=${pixabayKEY}&q=${searchImage}&${filtersAPI}&&page=${page}&per_page=6`);
        return response.data;
    } catch (error) {
        console.error(`Что-то пошло не так, ${error}`);
    }
}

export default { fetchImages };