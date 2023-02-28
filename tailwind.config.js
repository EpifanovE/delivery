const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',

    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "tg-theme-bg-color": "var(--tg-theme-bg-color)",
                "tg-theme-text-color": "var(--tg-theme-text-color)",
                "tg-theme-hint-color": "var(--tg-theme-hint-color)",
                "tg-theme-link-color": "var(--tg-theme-link-color)",
                "tg-theme-button-color": "var(--tg-theme-button-color)",
                "tg-theme-button-text-color": "var(--tg-theme-button-text-color)",
                "tg-theme-secondary-bg-color": "var(--tg-theme-secondary-bg-color)",
            }
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
