<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>{{ config('app.name', 'Laravel') }}</title>

        <link rel="stylesheet" href="https://fonts.bunny.net/css2?family=Nunito:wght@400;600;700&display=swap">
        <script src="https://telegram.org/js/telegram-web-app.js"></script>
        @viteReactRefresh
        @vite(['resources/js/webapp/app.tsx'])
        <script>
            var services = {{ Illuminate\Support\Js::from($services) }};
            var settings = {{ Illuminate\Support\Js::from($settings) }};
        </script>
    </head>
    <body class="font-sans antialiased">
        <div id="webapp"></div>
    </body>
</html>
