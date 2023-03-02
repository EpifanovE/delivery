import {AxiosStatic} from "axios";
import {ProductServerItem} from "../../common/types/products";

declare global {
    var axios: AxiosStatic
    var route: any
    var products: ProductServerItem[]
}
