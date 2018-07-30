import ApiService from '@/lib/ApiService';

export default {
    fetchImages: ({ commit }, { limit, offset, imageWidth, renderType })=>{
        return new Promise(async(res)=>{
            // dispatch(startFetch());
            let images = await ApiService.send(`/images?limit=${limit}&offset=${offset}&width=${imageWidth}&typeImg=${renderType}`, { method: 'GET' });
            console.log(images);
            commit("addImages", images);
            res();
        })
    }
}