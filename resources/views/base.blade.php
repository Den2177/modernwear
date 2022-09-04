<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('public/css/style.css')}}">
    <title>Modern Wear</title>
</head>
<body>
<script src="https://unpkg.com/vue@3"></script>
<div id="app">
    <div class="main-wrap">
        <KeepAlive>
            <component ref="main-window" :is="currentPage"></component>
        </KeepAlive>
        <div class="notification-block" :class="{'green': notification.isSuccess }" v-if="notification.visible">
            <div class="message" v-html="notification.message"></div>
        </div>
    </div>

</div>
<script type="module" src="{{asset('public/js/script.js')}}"></script>
</body>
</html>
