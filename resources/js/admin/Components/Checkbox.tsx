export default function Checkbox(props: React.HTMLProps<HTMLInputElement>) {

    // const { name, value, onChange, checked } = props;

    return (
        <input
            type="checkbox"
            {...props}
            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500"
        />
    );
}
