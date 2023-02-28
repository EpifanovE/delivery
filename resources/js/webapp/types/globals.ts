import {AxiosStatic} from "axios";
import {ServiceServerItem} from "../../common/types/services";

declare global {
    var axios: AxiosStatic
    var route: any
    var services: ServiceServerItem[]
}
