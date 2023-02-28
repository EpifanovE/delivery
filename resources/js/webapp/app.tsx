import './bootstrap';
import '../../css/webapp/app.css';
import {createRoot} from "react-dom/client";
import App from "./Components/App";

document.addEventListener('DOMContentLoaded', () => {
    const domContainer = document.querySelector('#webapp');

    if (!domContainer) return;

    const baseUrl = (domContainer as HTMLDivElement).dataset.base || '/webapp';

    const root = createRoot(domContainer);

    root.render(<App baseUrl={baseUrl} />);
});
