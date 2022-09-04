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
    <form action="{{route('product.update', $product->id)}}" method="POST" class="form box" enctype="multipart/form-data">
        @csrf
        <input type="text" class="input" name="name" placeholder="name" value="{{old('name')}}">
        <input type="text" class="input" name="description" placeholder="description" value="{{old('description')}}">
        <input type="text" class="input" name="price" placeholder="price" value="{{old('price')}}">
        <input type="file" name="image" value="{{old('image')}}">
        @foreach($categories as $category)
            <input type="checkbox" name="categories[{{$category->id}}]" value="{{old("categories[$category->id]")}}">
            <span>{{$category->name}}</span>
        @endforeach
        @foreach($sizes as $size)
            <input type="checkbox" name="sizes[{{$size->id}}]" value="{{old("sizes[$size->id]")}}">
            <span>{{$size->size_unit}}</span>
        @endforeach
        <button class="btn black" type="submit">Обновить</button>
    </form>
</div>

</body>
</html>
