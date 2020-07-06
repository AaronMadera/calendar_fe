<template>
    <div>
        <h1>Layout</h1>
         <router-view :key="$route.fullPath"/>
    </div>
</template>

<script>
export default {
    name:'Layout',

}
</script>