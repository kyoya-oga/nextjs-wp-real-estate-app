export default function Input({ ...rest }) {
  return (
    <input
      {...rest}
      className="block rounded border-2 border-slate-400 p-1 hover:border-slate-500"
    />
  );
}
