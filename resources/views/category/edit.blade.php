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
    <form action="{{route('category.update', $category->id)}}" method="POST" class="form box" enctype="multipart/form-data">
        @csrf
        <input type="text" class="input" name="name" placeholder="name" value="{{old('name')}}">
        <input type="file" name="image" value="{{old('image')}}">
        <input type="checkbox" name="header_visible">
        <button class="btn black" type="submit">Обновить</button>
    </form>
</div>

</body>
</html>
