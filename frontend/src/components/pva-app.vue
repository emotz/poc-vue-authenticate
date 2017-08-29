<template>
    <transition name="fade"
                appear>
        <div class="wrapper">
            <div class="container content">
                {{ project_name }}
                <!-- <router-view></router-view> -->
            </div>
            <div id="footer">
                © 2017 emotz
            </div>
        </div>
    </transition>
</template>

<script src="./pva-app.js"></script>

<style>
.blur {
    color: transparent;
    text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    user-select: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity .5s
}

.fade-enter,
.fade-leave-to {
    opacity: 0
}

.content {
    flex: 1 0 auto;
}

.wrapper {
    display: flex;
    flex-direction: column;
    height: 100%;
}

#footer {
    text-align: center;
    line-height: 30px;
    height: 30px;
    background: lightgrey;
}

.force-parent-lh {
    line-height: inherit !important;
}
</style>
