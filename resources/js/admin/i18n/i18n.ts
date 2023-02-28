import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import HttpApi, { HttpBackendOptions } from 'i18next-http-backend';
import intervalPlural from 'i18next-intervalplural-postprocessor';

i18n
    .use(intervalPlural)
    .use(initReactI18next)
    .use(HttpApi)
    .init<HttpBackendOptions>({
        initImmediate: false,
        backend: {
            loadPath: "/lang/{{lng}}/{{ns}}.json",
        },
        lng: "ru",
        fallbackLng: "ru",
        interpolation: {
            escapeValue: false
        }
    });
