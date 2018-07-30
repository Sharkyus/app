<template>
    <div class="wall">
        <ImageThumb v-for="image in images"
                    :key="image.id"
                    :data="image"
                    ref="thumbs"
                    @toggle-select="$emit('thumb-toggle-select', arguments)"
        />
    </div>
</template>

<script>
    import ImageThumb from './ImageThumb';

    export default {
        name: "Wall",
        components: { ImageThumb },
        props: {
            images: {
                type: Array
            }
        },
        methods: {
            updateImagesSizes(){
                this.$refs.thumbs.forEach((tb)=>{
                    tb.updateImageSize();
                });
            },
        }
    }
</script>