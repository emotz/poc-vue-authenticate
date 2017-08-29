<template>
    <div>
        <button class="pva-btn-signin btn btn-success"
                @click="signin"
                :disabled="isAuthenticated">
            Sign In with Facebook
        </button>
        <button class="pva-btn-signout btn btn-default"
                @click="signout"
                :disabled="!isAuthenticated">
            Log out
        </button>
        <button class="pva-btn-getprofile btn btn-success"
                @click="getprofile"
                :disabled="!isAuthenticated">
            Get profile
        </button>
    </div>
</template>

<script src="./pva-signin.js"></script>
