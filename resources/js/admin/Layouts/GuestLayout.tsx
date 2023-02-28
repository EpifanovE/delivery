import {HasChildren} from "../types/general";
import {FC} from "react";

type GuestProps = {} & HasChildren;

const Guest: FC<GuestProps> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-sm">
                {children}
            </div>
        </div>
    );
}

export default Guest;
