<!doctype html>
<html lang="en" xmlns="http://www.w3.org/1999/html">
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
    <div class="admin-page">
        <div class="container">
            <div class="admin-body">
                <div class="products-block">
                    <div class="header-block">
                        <h2>Товары</h2>
                    </div>
                    <div class="panel">
                        <div class='products'>
                            @foreach($products as $product)
                                <div class='card box'>
                                    <div class='image'><img src="{{$product->image}}" alt='product image'>
                                    </div>
                                    <div class="padding-wrap">
                                        <h3>{{$product->name}}</h3>
                                        <div class="product-cats">
                                            @foreach($product->categories as $category)
                                                <div class="product-cat vertical">
                                                    {{$category->name}}
                                                </div>
                                            @endforeach
                                        </div>
                                        <div class="product-description">
                                            {{$product->description}}
                                        </div>
                                        <div class="product-price">
                                            {{$product->price}}₽
                                        </div>
                                        <div class="product-sizes">
                                            @foreach ($product->sizes as $size)
                                                <div class="product-size">
                                                    {{$size->size_unit}}
                                                </div>
                                            @endforeach
                                        </div>
                                        <div class="bottom-buttons">
                                            <a class="btn black" href="{{route('product.edit', $product->id)}}">Редактировать</a>
                                            <button class="btn" @click="openPopup({{$product->id}})">Удалить</button>
                                        </div>
                                    </div>

                                </div>
                            @endforeach
                        </div>
                        <form action="{{route('product.create')}}" class="form box" method="POST"
                              enctype="multipart/form-data">
                            @csrf
                            <input type="text" class="input" name="name" placeholder="name">
                            <input type="text" class="input" name="description" placeholder="description">
                            <input type="number" class="input" name="price" placeholder="price">
                            <input type="file" name="image">

                            <div class="sizes-block">
                                @foreach($sizes as $size)
                                    <label class="one-size">
                                        <input type="checkbox" checked name="sizes[{{$size->id}}]">
                                        <span>{{$size->size_unit}}</span>
                                    </label>
                                @endforeach
                            </div>

                            <button class="btn black" type="submit">Создать</button>
                        </form>
                    </div>
                </div>
                <div class="categories-block">
                    <div class="header-block">
                        <h2>Категории</h2>
                    </div>
                    <div class="panel">
                        <div class="categories">
                            @foreach ($categories as $category)
                                <div class="card box">
                                    <div class="cat-image image">
                                        <img src="{{$category->image}}" alt="cat image">
                                    </div>
                                    <div class="padding-wrap">
                                        <h3 class="cat-name">
                                            {{ $category->name }}
                                        </h3>
                                        <div class="bottom-buttons">
                                            <a href="{{route('category.edit', $category->id)}}" class="btn black">Редактировать</a>
                                            <button @click="deleteCategory({{$category->id}})" class="btn">Удалить
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            @endforeach
                        </div>
                        <div class="left-blocks">
                            <form action="{{route('category.store')}}" method="POST" class="form box"
                                  enctype="multipart/form-data">
                                @csrf
                                <input type="text" class="input" name="name" placeholder="name"
                                       value="{{old('name')}}">
                                <input type="file" name="image" value="{{old('image')}}" accept="image/*">
                                <label>
                                    <input type="checkbox" name="header_visible">
                                    <span>Показывать в шапке</span>
                                </label>
                                <button class="btn black" type="submit">Создать</button>
                            </form>
                            <div class="form box">
                                <form action="{{route('category.add-product')}}" class="form">
                                    <h3>Добавить товар: </h3>
                                    <select name="product_id">
                                        @foreach ($products as $product)
                                            <option value="{{$product->id}}">
                                                {{$product->name}}
                                            </option>
                                        @endforeach
                                    </select>
                                    <h4>В категорию под названием: </h4>
                                    <select name="category_id">
                                        @foreach ($categories as $category)
                                            <option value="{{$category->id}}">
                                                {{$category->name}}
                                            </option>
                                        @endforeach
                                    </select>

                                    <button type="submit" class="btn">Добавить</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="users-block">
                    <div class="header-block">
                        <h2>Пользователи</h2>
                    </div>
                    <div class="panel">
                        <div class="table-item">
                            <table class="table">
                                <tr>
                                    <th>Логин</th>
                                    <th>Пароль</th>
                                    <th>Права администратора</th>
                                </tr>
                                @foreach($users as $user)
                                    <tr>
                                        <td>
                                            {{$user->login}}
                                        </td>
                                        <td>{{$user->password}}</td>
                                        <td>{{$user->isAdmin ? 'Да' : 'Нет'}}</td>
                                        <td>
                                            <button class="btn" @click="deleteUser({{$user->id}})">X</button>
                                        </td>
                                        <td>
                                            <a class="btn black" href="{{route("user.edit", $user->id)}}">🖋</a>
                                        </td>
                                    </tr>
                                    </tr>
                                @endforeach
                            </table>
                        </div>

                        <form action="{{route('user.store')}}" method="POST" class="form box"
                              enctype="multipart/form-data">
                            @csrf
                            <input type="text" class="input" name="login" placeholder="Логин"
                                   value="{{old('login')}}">
                            <input type="password" name="password" class="input" placeholder="Пароль"
                                   value="{{old('password')}}">
                            <label>
                                <input type="checkbox" name="isAdmin">
                                <span>Права администратора</span>
                            </label>
                            <button class="btn black" type="submit">Создать</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-wrapper" id="#modal" v-if="modalVisible" @click="modalVisible = false">
        <div class="box" @click.stop>
            <h3 class="modal-message">
                Вы уверены что хотите удалить продукты?
            </h3>
            <div class="buttons">
                <a href="#" class="btn black" @click.prevent="modalVisible = false">Отмена</a>
                <a href="" id="confirmLink" class="btn" @click.prevent="confirm">Да</a>
            </div>
        </div>
    </div>

    <div class="modal-wrapper" id="#category-modal" v-if="categoryModalVisible"
         @click="categoryModalVisible = false">
        <div class="box" @click.stop>
            <h3 class="modal-message">
                Вы уверены что хотите удалить категорию?
            </h3>
            <div class="buttons">
                <a href="#" class="btn black" @click.prevent="categoryModalVisible = false">Отмена</a>
                <a href="" class="btn" @click.prevent="confirmCategory">Да</a>
            </div>
        </div>
    </div>

    <div class="modal-wrapper" id="#category-modal" v-if="usersModalVisible" @click="usersModalVisible = false">
        <div class="box" @click.stop>
            <h3 class="modal-message">
                Вы уверены что хотите удалить пользователя?
            </h3>
            <div class="buttons">
                <a href="#" class="btn black" @click.prevent="usersModalVisible = false">Отмена</a>
                <a href="" class="btn" @click.prevent="confirmUser">Да</a>
            </div>
        </div>
    </div>
</div>

<script src="{{asset('public/js/middleware.js')}}"></script>
<script type="module" src="{{asset('public/js/script.js')}}"></script>
</body>
</html>
