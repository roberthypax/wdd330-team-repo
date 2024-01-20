import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import Alert from './Alert.js';

window.onload = () => {
    const alert = new Alert();
    const alertsSection = alert.createAlerts();

    const mainElement = document.querySelector('main');
    mainElement.prepend(alertsSection);
};

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const listing = new ProductList("Tents", dataSource, element);

listing.init();