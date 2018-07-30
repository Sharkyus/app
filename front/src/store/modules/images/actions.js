import ApiService from '@/lib/ApiService';

export default {
    fetchImages: ({ commit }, { limit, offset, imageWidth, renderType })=>{
        return new Promise(async(res)=>{
            commit('startFetch');
            let images = await ApiService.send(`/images?limit=${limit}&offset=${offset}&width=${imageWidth}&typeImg=${renderType}`, { method: 'GET' });
            commit("addImages", images);
            res();
        })
    },
    updateImagesRotations: (context, data)=>{
        return new Promise(async(res)=>{
            await ApiService.send(`/images`, { method: 'PUT' }, data);
            res();
        });
    }
}