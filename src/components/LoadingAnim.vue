<template>
    <div id="loader"></div>
</template>

<style scoped>
#loader {
    margin: 0 auto;
    margin-top: 20px;
    border: 12px solid #f3f3f3;
    border-top: 12px solid #3498db;
    border-radius: 50%;
    width: 80px;
    height: 80px;
    -webkit-animation: spin 2s linear infinite; 
    animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
}
  
@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>