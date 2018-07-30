<template>
    <div class="image-thumb"
         :class="{
            'loading': !loaded,
            'image-thumb_selected': data.selected
         }"
         @click="_onItemClick"
    >
        <img class="image-thumb__image"
             :src="data.url"
             :alt="data.name"
             @load="_onImageLoaded"
             :style="{
                 width: imageWidth,
                 height: imageHeight,
                 transform: `rotate(${data.rotateDeg}deg)`
             }"
             ref="image"/>
    </div>
</template>

<script>
    export default {
        name: "ImageThumbs",
        props: {
            data: {
                type: Object
            }
        },
        data(){
            return {
                loaded: false,
                imageWidth: '',
                imageHeight: '',
                rotateDeg: 0,
                selected: false
            }
        },
        methods: {
            updateImageSize(){
                let { image } = this.$refs;
                let {width, height} = this.$el.getBoundingClientRect();
                if (image.naturalWidth > image.naturalHeight){
                    this.imageWidth = `${Math.min(width, height)}px`;
                    this.imageHeight = 'auto';
                } else {
                    this.imageHeight =`${Math.min(width, height)}px`;
                    this.imageWidth = 'auto';
                }
            },
            _onImageLoaded(){
                this.loaded = true;
                this.updateImageSize();
            },
            _onItemClick(){
                let { id, selected } = this.data;
                this.$emit("toggle-select", id, !selected);
            }
        }
    }
</script>