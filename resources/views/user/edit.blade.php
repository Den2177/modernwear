<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="{{asset('public/css/style.css')}}">
    <title>Edit Page</title>
</head>
<body>
<div class="auth-wrap">
    <form action="{{route('user.update', $user->id)}}" method="POST" class="form box"
          enctype="multipart/form-data">
        @csrf
        <input type="text" class="input" name="login" placeholder="Логин"
               value="{{$user->login}}">
        <input type="password" name="password" class="input" placeholder="Пароль" value="{{$user->password}}">
        <div>
            <input type="checkbox" name="isAdmin" {{$user->isAdmin ? "checked" : ""}}>
            <span>Права администратора</span>

        </div>
        <button class="btn black" type="submit">Обновить</button>
    </form>
</div>

</body>
</html>
