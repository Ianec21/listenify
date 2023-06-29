import axios from "axios";

export default async function SearchTrack(track_name: string){
    const options = {
        method: 'GET',
        url: 'https://deezerdevs-deezer.p.rapidapi.com/search',
        params: {q: track_name},
        headers: {
            'X-RapidAPI-Key': '51a2ca5456mshf3cc589a6ce6a2bp1c79ffjsn52d914162ab6',
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com'
        }
    };
      
    try {
        const response = await axios.request(options);
        return response.data;
    } catch (error) {
        return null;
    }
}